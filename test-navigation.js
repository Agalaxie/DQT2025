const { chromium } = require('playwright');

async function testNavigation() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Aller à la page locale
  await page.goto('http://localhost:3001');

  // Prendre screenshot initial
  await page.screenshot({ path: 'nav-initial.png', fullPage: true });
  console.log('📸 Screenshot initial pris');

  // Attendre que la page soit chargée
  await page.waitForTimeout(2000);

  // Scroller vers le bas
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(1000);

  // Prendre screenshot après scroll down
  await page.screenshot({ path: 'nav-scrolled-down.png', fullPage: true });
  console.log('📸 Screenshot après scroll down pris');

  // Scroller vers le haut
  await page.evaluate(() => window.scrollBy(0, -500));
  await page.waitForTimeout(1000);

  // Prendre screenshot après scroll up
  await page.screenshot({ path: 'nav-scrolled-up.png', fullPage: true });
  console.log('📸 Screenshot après scroll up pris');

  // Compter le nombre de navigations visibles
  const navCount = await page.$$eval('nav', navs => {
    return navs.filter(nav => {
      const style = window.getComputedStyle(nav);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }).length;
  });

  console.log(`🔍 Nombre de navigations visibles: ${navCount}`);

  // Vérifier les éléments de navigation
  const navElements = await page.$$eval('nav', navs => {
    return navs.map((nav, index) => {
      const style = window.getComputedStyle(nav);
      const rect = nav.getBoundingClientRect();
      return {
        index,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        position: style.position,
        top: style.top,
        zIndex: style.zIndex,
        width: rect.width,
        height: rect.height,
        className: nav.className
      };
    });
  });

  console.log('📋 Éléments de navigation détectés:');
  navElements.forEach((nav, i) => {
    console.log(`  Nav ${i + 1}:`, nav);
  });

  await browser.close();
}

testNavigation().catch(console.error);