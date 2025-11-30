import { NextResponse } from 'next/server';
import chromium from '@sparticuz/chromium';
import { LRUCache } from 'lru-cache';
import puppeteer from 'puppeteer'; // used only in local dev
import core, { Browser, Page } from 'puppeteer-core';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Safe memory LRU cache
const screenshotCache = new LRUCache<string, Buffer>({
  max: 30,
  ttl: 1000 * 60 * 2
});

let browserPromise: Promise<Browser> | null = null;

// Determine which Chromium to use based on environment
async function getExecutablePath() {
  const isLambda = !!process.env.AWS_EXECUTION_ENV;
  const isVercel = !!process.env.VERCEL;
  const isServerless = isLambda || isVercel;

  // Production serverless → use Chromium
  if (isServerless) {
    return await chromium.executablePath();
  }

  // Local dev → use full Puppeteer
  return puppeteer.executablePath();
}

//  Preload Chromium or Chrome
async function getBrowser() {
  if (!browserPromise) {
    const isProd = process.env.VERCEL || process.env.AWS_EXECUTION_ENV;

    const execPath = await getExecutablePath();

    browserPromise = core.launch({
      executablePath: execPath,
      args: [
        ...(isProd ? chromium.args : []),
        '--hide-scrollbars',
        '--disable-web-security',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-zygote'
      ],
      headless: true,
      defaultViewport: null
    });
  }

  return browserPromise;
}

// Simple safeGoto
async function safeGoto(page: Page, url: string) {
  return page.goto(url, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
    timeout: 60000
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });
  }

  const width = Number(searchParams.get('width')) || 800;
  const height = Number(searchParams.get('height')) || 420;
  const fullPageRequested = searchParams.get('fullPage') === 'true';

  const formatParam = (searchParams.get('format') || 'jpeg').toLowerCase();
  const format: 'png' | 'jpeg' = formatParam === 'png' ? 'png' : 'jpeg';
  const quality = format === 'jpeg' ? Number(searchParams.get('quality')) || 70 : undefined;

  const cacheKey = `${targetUrl}|${width}|${height}|${fullPageRequested}|${format}|${quality}`;
  const cached = screenshotCache.get(cacheKey);

  if (cached) {
    return new NextResponse(new Uint8Array(cached), {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=120'
      }
    });
  }

  let page: Page | null = null;

  try {
    const browser = await getBrowser();

    page = await browser.newPage();
    page.setDefaultNavigationTimeout(45000);
    await page.setViewport({ width, height });
    await page.setBypassCSP(true);

    await safeGoto(page, targetUrl);

    // Full-page auto handling (no double screenshot)
    let captureFullPage = false;

    if (fullPageRequested) {
      const docHeight = await page.evaluate(() => document.body.scrollHeight);
      captureFullPage = docHeight <= 2000;
    }

    // 🔥 Single-pass screenshot
    let screenshotBuffer = (await page.screenshot({
      type: format,
      fullPage: captureFullPage,
      quality
    })) as Buffer;

    // JPEG optimization only
    if (format === 'jpeg') {
      screenshotBuffer = await sharp(screenshotBuffer)
        .jpeg({ quality: quality || 70 })
        .toBuffer();
    }

    screenshotCache.set(cacheKey, screenshotBuffer);

    return new NextResponse(new Uint8Array(screenshotBuffer), {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=120'
      }
    });
  } catch (err: any) {
    console.error('Screenshot failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    if (page) {
      try {
        await page.close();
      } catch {
        //
      }
    }
  }
}
