import { chromium } from 'file:///C:/Users/qq953/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
const targets = [
  { name: 'desktop', width: 1440, height: 1000, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
]

for (const target of targets) {
  const page = await browser.newPage({
    viewport: { width: target.width, height: target.height },
    deviceScaleFactor: 1,
    isMobile: target.isMobile,
  })
  await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' })
  if (target.name === 'desktop') {
    const firstStage = page.locator('.project__stage').first()
    await firstStage.scrollIntoViewIfNeeded()
    await page.waitForTimeout(180)
    await page.screenshot({ path: '.impeccable/review/motion-enter.png' })
    await page.waitForTimeout(1200)
    await page.screenshot({ path: '.impeccable/review/motion-settled.png' })
  }
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.55) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 150))
    }
    window.scrollTo(0, 0)
  })
  await page.evaluate(async () => {
    await Promise.all([...document.images].map(async (image) => {
      if (image.complete && image.naturalWidth > 0) return
      await Promise.race([
        image.decode().catch(() => undefined),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ])
    }))
  })
  await page.waitForTimeout(1500)
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: `.impeccable/review/${target.name}.png`, fullPage: true })
  const issues = await page.evaluate(() => ({
    title: document.title,
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    missingImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
    headings: [...document.querySelectorAll('h1,h2,h3')].map((node) => node.textContent?.trim()),
  }))
  console.log(target.name, JSON.stringify(issues))
  await page.close()
}

await browser.close()
