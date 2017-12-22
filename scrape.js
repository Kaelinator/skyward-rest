const Promise   = require('bluebird')
const puppeteer = require('puppeteer')

const request = (lR, origin, encses) => {
  
  const req = new XMLHttpRequest()
	let info = lR
    .slice(4, -5)
    .split('^')
	
	req.open('POST', origin, false)
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
	req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
	
  req.send([
    `action=viewGradeInfoDialog`,
    `&gridCount=1`,
    `&fromHttp=yes`,
    `&stuId=${info[4]}`,
    `&entityId=004`,
    `&corNumId=72270`,
    `&track=0`,
    `&section=01`,
    `&gbId=1633625`,
    `&bucket=TERM+6`,
    `&subjectId=`,
    `&dialogLevel=1`,
    `&isEoc=no`,
    `&ishttp=true`,
    `&sessionid=${info[1]}%15${info[2]}`,
    `&encses=${encses}`,
    `&dwd=${info[0]}`,
    `&wfaacl=${info[2]}`
  ].join(''))

  return req.response
}

const scrape = module.exports = (url, id, pass) => {

  let loginResponse, referer, encses

  const handlePopup = (target) =>
    Promise.resolve(target.page())
      .then(popup => {
        return popup.waitFor('#encses', { timeout: 10000 })
          .then(() => popup.$('#encses'))
          .then(dom => dom.getProperty('value').then(v => v.jsonValue()))
          .then(encses => (encses) ? popup.evaluate(request, loginResponse, referer, encses) : '-')
      })
      .tap(console.log)
  
  const handleResponse = (response) =>
    Promise.resolve(response.text())
      .then(text =>
        Promise.resolve(response.request())
          .then(req => ({ text, req })))
      .then(({ text, req }) => {
        
        const correct = (text.substring(0, 4) === '<li>')
        loginResponse = correct ? text : 0
        referer = correct ? [ 
          ...req.headers.referer.split('/').slice(0, -1),
          'httploader.p?file=sfgradebook001.w'
        ].join('/') : 0
      })

  return Promise.resolve(puppeteer.launch({ headless: false }))
    .then(browser => browser.on('targetcreated', handlePopup))
    .then(browser => browser.newPage())
    .then(page => page.on('response', handleResponse))
    .then(page => 
      Promise.resolve(page.goto(url))
        .then(page.waitForSelector('#bLogin', { timeout: 10000, visibility: true }))
        .then(page.waitForSelector('#login', { timeout: 10000, visibility: true }))
        .then(page.waitForSelector('#password', { timeout: 10000, visibility: true }))
        .then(() => page.type('#login', id))
        .then(() => page.type('#password', pass))
        .then(() => page.click('#bLogin')))

  // await popup.setViewport({ width: 1000, height: 700 })
  // await popup.waitFor('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
  // await popup.click('a[data-nav="sfgradebook001.w"]')
  // await page.click('#bLogin')
  // await browser.close()
}