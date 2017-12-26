const Promise   = require('bluebird')
const puppeteer = require('puppeteer')

const query = (response, origin, encses, data) => {

  const req = new XMLHttpRequest()
  const info = response
    .slice(4, -5)
    .split('^')
  req.open('POST', origin, false)
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  
  req.send([
    `action=viewGradeInfoDialog`,
    `fromHttp=yes`,
    `stuId=${info[4]}`,
    `entityId=${data.eid}`,
    `corNumId=${data.cni}`,
    `track=${data.trk}`,
    `section=${data.sec}`,
    `gbId=${data.gid}`,
    `bucket=${data.bkt}`,
    `dialogLevel=1`,
    `isEoc=${data.eoc}`,
    `ishttp=true`,
    `sessionid=${info[1]}%15${info[2]}`,
    `encses=${encses}`,
    `dwd=${info[0]}`,
    `wfaacl=${info[2]}`
  ].join('&'))

  return req.response 
}

const scrape = module.exports = (url, id, pass) => {

  let loginResponse, referer, encses

  const handlePopup = (target) =>
    Promise.resolve(target.page())
      .then(popup => {
        return popup.setViewport({ width: 1000, height: 700 })
          .then(() => popup.waitForSelector('#encses', { timeout: 10000 }))
          .then(() => popup.$('#encses'))
          .then(dom => dom.getProperty('value'))
          .then(v => v.jsonValue())
          .then(encses => {
            if (encses) {

              // const fetch = popup.evaluate(query, loginResponse, referer, encses)
              // const fetch = query(loginResponse, referer, encses)

              return Promise.resolve(popup.waitForSelector('a[data-nav="sfgradebook001.w"]', { timeout: 10000 }))
                .then(() => popup.click('a[data-nav="sfgradebook001.w"]'))
                .then(() => popup.waitForSelector('a[name="showGradeInfo"]'))
                .then(() => popup.$$eval('a[name="showGradeInfo"]', links => 
                  links.map(a => ({

                  sid: a.getAttribute('data-sid'),
                  eid: a.getAttribute('data-eid'),
                  cni: a.getAttribute('data-cni'),
                  trk: a.getAttribute('data-trk'),
                  sec: a.getAttribute('data-sec'),
                  gid: a.getAttribute('data-gid'),
                  bkt: a.getAttribute('data-bkt'),
                  lit: a.getAttribute('data-bkt'),
                  eoc: a.getAttribute('data-eoc')
                }))))
                .mapSeries(data => popup.evaluate(query, loginResponse, referer, encses, data))
            }
          })
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
      .then(() => page.waitForSelector('#bLogin', { timeout: 10000, visibility: true }))
      .then(() => page.waitForSelector('#login', { timeout: 10000, visibility: true }))
      .then(() => page.waitForSelector('#password', { timeout: 10000, visibility: true }))
      .then(() => page.waitFor(150))
      .then(() => page.type('#login', id))
      .then(() => page.type('#password', pass))
      .then(() => page.click('#bLogin')))

  // await popup.setViewport({ width: 1000, height: 700 })
  // await popup.waitFor('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
  // await popup.click('a[data-nav="sfgradebook001.w"]')
  // await page.click('#bLogin')
  // await browser.close()
}