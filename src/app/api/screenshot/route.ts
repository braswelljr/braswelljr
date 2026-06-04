import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import { LRUCache } from 'lru-cache';
import puppeteer from 'puppeteer';
import core, { Browser, Page } from 'puppeteer-core';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const screenshotCache = new LRUCache<string, Uint8Array>({
  max: 50,
  ttl: 1000 * 60 * 10 // 10 min — screenshots rarely change
});

// Abort these resource types; they're not needed for visual rendering
const BLOCKED_RESOURCE_TYPES = new Set(['media', 'websocket', 'manifest', 'other']);

// Abort analytics/tracking hostnames — they're the #1 cause of slow load events
const BLOCKED_HOSTNAMES = [
  'google-analytics.com',
  'googletagmanager.com',
  'analytics.google.com',
  'hotjar.com',
  'mixpanel.com',
  'segment.io',
  'segment.com',
  'amplitude.com',
  'doubleclick.net',
  'facebook.net',
  'clarity.ms',
  'fullstory.com',
  'heapanalytics.com',
  'newrelic.com',
  'nr-data.net',
  'sentry.io'
];

function isBlockedHost(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return BLOCKED_HOSTNAMES.some((h) => hostname === h || hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

// Extra Chrome flags to reduce background overhead
const PERF_ARGS = [
  '--disable-background-networking',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-extensions',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-sync',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-first-run',
  '--safebrowsing-disable-auto-update'
];

let browserInstance: Browser | null = null;

async function getBrowser() {
  if (browserInstance && !browserInstance.connected) {
    console.warn('Browser disconnected, rebooting...');
    browserInstance = null;
  }

  if (!browserInstance) {
    const isServerless = !!process.env.AWS_EXECUTION_ENV || !!process.env.VERCEL;

    let execPath: string;

    if (isServerless) {
      const version = 'v143.0.0';
      const remoteExecutablePath = `https://github.com/Sparticuz/chromium/releases/download/${version}/chromium-${version}-pack.x64.tar`;
      execPath = await chromium.executablePath(remoteExecutablePath);
    } else {
      execPath = await puppeteer.executablePath();
    }

    browserInstance = await core.launch({
      executablePath: execPath,
      args: isServerless ? [...chromium.args, ...PERF_ARGS] : PERF_ARGS,
      defaultViewport: null,
      headless: true
    });
  }

  return browserInstance;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });

  const width = Number(searchParams.get('width')) || 800;
  const height = Number(searchParams.get('height')) || 420;
  const fullPageRequested = searchParams.get('fullPage') === 'true';
  const formatParam = (searchParams.get('format') || 'jpeg').toLowerCase();
  const format: 'png' | 'jpeg' = formatParam === 'png' ? 'png' : 'jpeg';
  const quality = format === 'jpeg' ? Number(searchParams.get('quality')) || 70 : undefined;

  const cacheKey = `${targetUrl}-${width}-${height}-${fullPageRequested}-${format}-${quality}`;
  const cached = screenshotCache.get(cacheKey);

  if (cached) {
    return new NextResponse(cached as any as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=120',
        'X-Cache': 'HIT'
      }
    });
  }

  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    // Run all page setup in parallel
    await Promise.all([
      page.setRequestInterception(true),
      page.setBypassCSP(true),
      page.setViewport({ width, height, deviceScaleFactor: 1 })
    ]);

    page.on('request', (req) => {
      if (BLOCKED_RESOURCE_TYPES.has(req.resourceType())) return req.abort();
      if (isBlockedHost(req.url())) return req.abort();
      req.continue();
    });

    try {
      await page.goto(targetUrl, {
        waitUntil: 'load',
        timeout: 20000
      });
    } catch (err: any) {
      if (err.name === 'TimeoutError' || err.message.includes('Timeout')) {
        console.warn(`Timeout loading ${targetUrl}, attempting screenshot anyway...`);
      } else {
        throw err;
      }
    }

    let captureFullPage = false;
    if (fullPageRequested) {
      const docHeight = await page.evaluate(() => document.body.scrollHeight);
      captureFullPage = docHeight <= 3000;
    }

    const screenshotBuffer = await page.screenshot({
      type: format,
      fullPage: captureFullPage,
      quality: format === 'jpeg' ? quality : undefined
    });

    screenshotCache.set(cacheKey, screenshotBuffer);

    return new NextResponse(screenshotBuffer as any as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Cache-Control': 'public, max-age=600, stale-while-revalidate=120',
        'X-Cache': 'MISS'
      }
    });
  } catch (err: any) {
    console.error('Screenshot error:', err);
    if (browserInstance && !browserInstance.connected) {
      browserInstance = null;
    }
    return NextResponse.json(
      { error: 'Failed to capture screenshot', details: err.message },
      { status: 500 }
    );
  } finally {
    if (page) await page.close().catch(() => {});
  }
}
