const Promise   = require('bluebird'),
      puppeteer = require('puppeteer')

const handlePopup = async (target) => {

  const popup = await target.page()
  await popup.waitFor('#encses', { timeout: 10000 })
  const encses = await popup.$('#encses')
  encses.getProperty('value').then(v => v.jsonValue())
}

const handleResponse = async (response) => {
  const body = await response.buffer()
  const text = await response.text()
  console.log({
    body: body,
    text: text,
    headers: response.headers,
    request: response.request
  })
}

const scrape = module.exports = async (url, id, pass) => {

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor('#bLogin', { timeout: 10000 })

  page.on('response', handleResponse)
  browser.on('targetcreated', handlePopup)
  await page.type('#login', id)
  await page.type('#password', pass)
  await page.click('#bLogin')
  
  
  // const [_0, _1, popup] = await browser.pages()
  // const encses = await popup.$('#encses')
  // encses.getProperty('value').then(v => v.jsonValue().then(console.log))

  // await popup.setViewport({ width: 1000, height: 700 })
  // await popup.waitFor('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
  // await popup.click('a[data-nav="sfgradebook001.w"]')
  // await page.click('#bLogin')
  // await browser.close()
}