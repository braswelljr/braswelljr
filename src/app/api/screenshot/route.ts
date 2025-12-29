import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium-min';
import { LRUCache } from 'lru-cache';
import puppeteer from 'puppeteer';
import core, { Browser, Page } from 'puppeteer-core';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const screenshotCache = new LRUCache<string, Uint8Array>({
  max: 50,
  ttl: 1000 * 60 * 5
});

let browserInstance: Browser | null = null;

async function getBrowser() {
  if (browserInstance && !browserInstance.connected) {
    console.warn('Browser disconnected, rebooting...');
    browserInstance = null;
  }

  if (!browserInstance) {
    const isServerless = !!process.env.AWS_EXECUTION_ENV || !!process.env.VERCEL;

    let execPath;

    if (isServerless) {
      const version = 'v143.0.0';

      const remoteExecutablePath = `https://github.com/Sparticuz/chromium/releases/download/${version}/chromium-${version}-pack.x64.tar`;

      execPath = await chromium.executablePath(remoteExecutablePath);
    } else {
      execPath = puppeteer.executablePath();
    }

    browserInstance = await core.launch({
      executablePath: execPath,
      args: isServerless ? chromium.args : [],
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
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        'X-Cache': 'HIT'
      }
    });
  }

  let page: Page | null = null;

  try {
    const browser = await getBrowser();
    page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (['document', 'stylesheet', 'image', 'font', 'script'].includes(resourceType)) {
        req.continue();
      } else if (['media', 'websocket', 'manifest', 'other'].includes(resourceType)) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await Promise.all([page.setViewport({ width, height, deviceScaleFactor: 1 }), page.setBypassCSP(true)]);

    try {
      await page.goto(targetUrl, {
        waitUntil: 'load',
        timeout: 20000 // 20s timeout
      });
    } catch (err: any) {
      if (err.name === 'TimeoutError' || err.message.includes('Timeout')) {
        console.warn(`Timeout loading ${targetUrl}, attempting screenshot anyway...`);
      } else {
        throw err; // Re-throw other errors (like DNS failure)
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
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
        'X-Cache': 'MISS'
      }
    });
  } catch (err: any) {
    console.error('Screenshot error:', err);
    if (browserInstance && !browserInstance.connected) {
      browserInstance = null;
    }
    return NextResponse.json({ error: 'Failed to capture screenshot', details: err.message }, { status: 500 });
  } finally {
    if (page) await page.close().catch(() => {});
  }
}
