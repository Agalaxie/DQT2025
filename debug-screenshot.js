const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });

  // Wait for animations to load
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({
    path: 'hero-debug.png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1920, height: 800 }
  });

  // Get computed styles of hero section
  const heroStyles = await page.evaluate(() => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const styles = window.getComputedStyle(hero);
      return {
        backgroundColor: styles.backgroundColor,
        background: styles.background
      };
    }
    return null;
  });

  console.log('Hero section styles:', heroStyles);

  await browser.close();
})();