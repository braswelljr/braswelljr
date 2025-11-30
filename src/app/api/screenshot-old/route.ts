import { NextResponse } from 'next/server';
import puppeteer, { Browser, Page } from 'puppeteer';
import sharp from 'sharp';

export const dynamic = 'force-dynamic';
const screenshotCache = new Map<string, Buffer>();

async function safeGoto(page: Page, url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
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

  // 🔧 Defaults (smaller viewport)
  const width = Number(searchParams.get('width')) || 800;
  const height = Number(searchParams.get('height')) || 420;
  const fullPage = searchParams.get('fullPage') === 'true';
  const formatParam = String(searchParams.get('format') || 'jpeg').toLowerCase();
  const format: 'png' | 'jpeg' = formatParam === 'png' ? 'png' : 'jpeg';
  const quality = format === 'jpeg' ? Number(searchParams.get('quality')) || 70 : undefined;

  const cacheKey = `${targetUrl}|${width}|${height}|${fullPage}|${format}|${quality}`;
  if (screenshotCache.has(cacheKey)) {
    const cached = screenshotCache.get(cacheKey)!;
    return new NextResponse(new Uint8Array(cached), {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=120'
      }
    });
  }

  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    await page.setViewport({ width, height });
    await page.setBypassCSP(true);

    await safeGoto(page, targetUrl);

    // ⚡ Screenshot capture
    let screenshotBuffer = (await page.screenshot({
      type: format,
      quality,
      fullPage
    })) as Buffer;

    // 🧠 Auto-trim extreme fullPage height
    if (fullPage) {
      const bodyHandle = await page.$('body');
      const boundingBox = bodyHandle ? await bodyHandle.boundingBox() : null;
      const fullHeight = boundingBox ? Math.ceil(boundingBox.height) : height;
      const maxHeight = 2000;
      if (fullHeight > maxHeight) {
        await page.setViewport({ width, height: maxHeight });
        screenshotBuffer = (await page.screenshot({
          type: format,
          quality,
          fullPage: true
        })) as Buffer;
      }
    }

    await browser.close();

    // 🪄 Sharp post-compression
    try {
      screenshotBuffer = await sharp(screenshotBuffer)
        .toFormat(format, { quality: quality || 70, compressionLevel: 9, progressive: true, chromaSubsampling: '4:2:0' })
        .toBuffer();
    } catch (err) {
      console.warn('Sharp compression skipped:', err);
    }

    screenshotCache.set(cacheKey, screenshotBuffer);

    const body = new Uint8Array(screenshotBuffer);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
        'Cache-Control': 'public, max-age=120'
      }
    });
  } catch (err: any) {
    if (browser) await browser.close();
    console.error('Screenshot failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
