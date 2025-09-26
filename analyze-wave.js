const { chromium } = require('playwright');

async function analyzeWaveNavigation() {
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();

  // Aller sur Wave.co
  await page.goto('https://wave.co');
  console.log('📱 Chargement de Wave.co...');

  // Attendre que la page soit chargée
  await page.waitForTimeout(3000);

  // Screenshot initial
  await page.screenshot({ path: 'wave-initial.png', fullPage: false });
  console.log('📸 Screenshot initial de Wave.co');

  // Analyser la structure de navigation initiale
  const initialNav = await page.$eval('nav, header, [role="banner"]', nav => {
    const style = window.getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      position: style.position,
      top: style.top,
      background: style.background,
      backdropFilter: style.backdropFilter,
      borderRadius: style.borderRadius,
      className: nav.className,
      innerHTML: nav.innerHTML.substring(0, 200) + '...'
    };
  }).catch(() => null);

  console.log('📋 Navigation initiale Wave.co:', initialNav);

  // Scroller vers le bas progressivement
  console.log('⬇️ Scrolling vers le bas...');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(2000);

  // Screenshot après scroll down
  await page.screenshot({ path: 'wave-scrolled-down.png', fullPage: false });
  console.log('📸 Screenshot après scroll down');

  // Scroller vers le haut
  console.log('⬆️ Scrolling vers le haut...');
  await page.evaluate(() => window.scrollBy(0, -400));
  await page.waitForTimeout(2000);

  // Screenshot après scroll up
  await page.screenshot({ path: 'wave-scrolled-up.png', fullPage: false });
  console.log('📸 Screenshot après scroll up');

  // Analyser la structure après scroll up
  const scrolledNav = await page.$eval('nav, header, [role="banner"]', nav => {
    const style = window.getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      position: style.position,
      top: style.top,
      background: style.background,
      backdropFilter: style.backdropFilter,
      borderRadius: style.borderRadius,
      className: nav.className,
      transform: style.transform,
      transition: style.transition
    };
  }).catch(() => null);

  console.log('📋 Navigation après scroll Wave.co:', scrolledNav);

  // Comparer les deux états
  if (initialNav && scrolledNav) {
    console.log('\n🔍 Comparaison:');
    console.log(`Width: ${initialNav.width}px → ${scrolledNav.width}px`);
    console.log(`Height: ${initialNav.height}px → ${scrolledNav.height}px`);
    console.log(`Background: ${initialNav.background} → ${scrolledNav.background}`);
    console.log(`Border Radius: ${initialNav.borderRadius} → ${scrolledNav.borderRadius}`);
    console.log(`Backdrop Filter: ${initialNav.backdropFilter} → ${scrolledNav.backdropFilter}`);
  }

  await browser.close();
}

analyzeWaveNavigation().catch(console.error);