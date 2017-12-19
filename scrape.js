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

const scrape = module.exports = async (url, id, pass) => {

  let loginResponse, referer, encses

  const handlePopup = async (target) => {

    const popup = await target.page()
    await popup.waitFor('#encses', { timeout: 10000 })
    encsesDOM = await popup.$('#encses')
    encses = await encsesDOM.getProperty('value').then(v => v.jsonValue())
    console.log(loginResponse, referer, encses)
    console.log(await popup.evaluate(request, loginResponse, referer, encses))
  }
  
  const handleResponse = async (response) => {

    const text = await response.text()
    const req = await response.request()
    if (text.substring(0, 4) === '<li>') {

      loginResponse = text
      referer = [...req.headers.referer.split('/').slice(0, -1), 'httploader.p?file=sfgradebook001.w'].join('/')
    }
  }

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitFor('#bLogin', { timeout: 10000 })

  page.on('response', handleResponse)
  browser.on('targetcreated', handlePopup)
  await page.type('#login', id)
  await page.type('#password', pass)
  await page.click('#bLogin')

  // await popup.setViewport({ width: 1000, height: 700 })
  // await popup.waitFor('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
  // await popup.click('a[data-nav="sfgradebook001.w"]')
  // await page.click('#bLogin')
  // await browser.close()
}