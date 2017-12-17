const Promise   = require('bluebird'),
      puppeteer = require('puppeteer')

const scrape = module.exports = async (url, id, pass) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // page.on('response', p => {

  // })

  await page.goto(url)
  await page.waitFor('#login', { timeout: 10000 })
  await page.type('#login', id)
  await page.type('#password', pass)
  await page.click('#bLogin')
  await page.waitFor(3000)
  const [_0, _1, popup] = await browser.pages()
  const encses = await popup.$('#encses')
  encses.getProperty('value').then(v => v.jsonValue().then(console.log))

  // await popup.setViewport({ width: 1000, height: 700 })
  // await popup.waitFor('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
  // await popup.click('a[data-nav="sfgradebook001.w"]')
  // await page.click('#bLogin')
  // await browser.close()
}