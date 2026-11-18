// 사용법: node cards/myeongi/render.js cards/toon-ohaeng 8
//   → <폴더>/src/toon.html 의 ?p=1..N 을 <폴더>/01.png ~ 0N.png 로 저장
const { chromium } = require('playwright');
const path = require('path');

const dir = path.resolve(process.argv[2]);
const count = +process.argv[3] || 8;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const file = 'file://' + path.join(dir, 'src', 'toon.html');
  for (let p = 1; p <= count; p++) {
    await page.goto(`${file}?p=${p}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(dir, String(p).padStart(2, '0') + '.png');
    await page.screenshot({ path: out });
    console.log(out);
  }
  await browser.close();
})();
