/**
 * Capture the card image for every entry in src/config/other-projects.ts.
 *
 * The cards used to ask a route handler to boot a headless browser on every
 * cold request, which is why they took seconds to appear. A homepage does not
 * change between visits, so the capture happens here instead, once, and the
 * site serves the result as an ordinary static image.
 *
 * Run with `pnpm screenshots`, or `pnpm screenshots <slug>` for one project.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import puppeteer from 'puppeteer';
import { OTHER_PROJECTS } from '../src/config/other-projects.ts';

const OUT_DIR = 'public/images/projects';
/** 16:9, the shape of the card. Twice the widest card, so it stays sharp. */
const VIEWPORT = { width: 1280, height: 720 };

const only = process.argv.slice(2);
const projects = OTHER_PROJECTS.filter(
  (project) => project.homepageUrl && (only.length < 1 || only.includes(project.slug))
);

mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ headless: true });
let failed = 0;

try {
  // One page each, all at once: the sites are unrelated, so nothing is gained
  // by waiting for one before starting the next.
  await Promise.all(
    projects.map(async (project) => {
      const page = await browser.newPage();
      try {
        await page.setViewport({ ...VIEWPORT, deviceScaleFactor: 1 });
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
        // A page that keeps a socket or a poll open never goes idle. What it has
        // painted by the deadline is still the picture we came for.
        await page
          .goto(project.homepageUrl, { waitUntil: 'networkidle2', timeout: 30_000 })
          .catch((error) => {
            if (error?.name !== 'TimeoutError') throw error;
          });
        // Let entrance animations finish, so the hero is not caught half faded.
        await new Promise((resolve) => setTimeout(resolve, 2_000));
        await page.screenshot({
          path: join(OUT_DIR, `${project.slug}.jpg`),
          type: 'jpeg',
          quality: 82
        });
        console.log(`captured ${project.slug}`);
      } catch (error) {
        failed += 1;
        console.error(
          `failed   ${project.slug}: ${error instanceof Error ? error.message : error}`
        );
      } finally {
        await page.close();
      }
    })
  );
} finally {
  await browser.close();
}

if (failed > 0) process.exitCode = 1;
