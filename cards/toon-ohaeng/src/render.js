// 사용법: node cards/toon-ohaeng/src/render.js  → cards/toon-ohaeng/01.png ~ 08.png
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const file = 'file://' + path.join(__dirname, 'toon.html');
  for (let p = 1; p <= 8; p++) {
    await page.goto(`${file}?p=${p}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(__dirname, '..', String(p).padStart(2, '0') + '.png');
    await page.screenshot({ path: out });
    console.log(out);
  }
  await browser.close();
})();
