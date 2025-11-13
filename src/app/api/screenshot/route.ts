import { NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';

export const dynamic = 'force-dynamic';
const screenshotCache = new Map<string, Buffer>();

async function safeGoto(page: Page, url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000
      });
      return;
    } catch (err) {
      console.warn(`Goto attempt ${i + 1} failed:`, err);
      if (i === retries - 1) throw err;
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');
  if (!targetUrl) return NextResponse.json({ error: 'Missing ?url=' }, { status: 400 });

  const width = Number(searchParams.get('width')) || 1200;
  const height = Number(searchParams.get('height')) || 630;
  const fullPage = searchParams.get('fullPage') === 'true';
  const formatParam = String(searchParams.get('format') || 'png').toLowerCase();
  const format: 'png' | 'jpeg' = formatParam === 'jpeg' ? 'jpeg' : 'png';

  const cacheKey = `${targetUrl}|${width}|${height}|${fullPage}|${format}`;
  if (screenshotCache.has(cacheKey)) {
    const cached = screenshotCache.get(cacheKey)!;

    return new NextResponse(new Uint8Array(cached), {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=60'
      }
    });
  }

  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.setViewport({ width, height });
    await page.setBypassCSP(true);

    await safeGoto(page, targetUrl);

    // Auto-scale for very long pages
    let screenshotBuffer: Buffer;
    if (fullPage) {
      const bodyHandle = await page.$('body');
      const boundingBox = bodyHandle ? await bodyHandle.boundingBox() : { width, height };
      let fullHeight = boundingBox ? Math.ceil(boundingBox.height) : height;

      // Prevent excessively tall screenshots
      const maxHeight = 3000; // adjust as needed
      if (fullHeight > maxHeight) fullHeight = maxHeight;

      await page.setViewport({ width, height: fullHeight });
      screenshotBuffer = (await page.screenshot({ type: format, fullPage: true })) as Buffer;
    } else {
      screenshotBuffer = (await page.screenshot({ type: format, fullPage: false })) as Buffer;
    }

    await browser.close();

    screenshotCache.set(cacheKey, screenshotBuffer);

    const body = new Uint8Array(screenshotBuffer);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (err: any) {
    if (browser) await browser.close();
    console.error('Screenshot failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
