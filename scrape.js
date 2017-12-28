const Promise   = require('bluebird')
const puppeteer = require('puppeteer')

const Scraper = (url) =>
  (sId, pass) => {

    let loginInfo, encses, popup
    let retriever

    const queue = []

    const referer = url.split('/')
      .slice(0, -1)
      .concat('httploader.p?file=sfgradebook001.w')
      .join('/')

    const browser = puppeteer.launch()
      .then(browser => browser.on('targetcreated', handlePopup))
      .then(browser =>
        browser.newPage()
          .then(page =>
            page.goto(url)
              .then(() => page.on('response', handleResponse))
              .then(() => page.waitForSelector('#bLogin', { timeout: 5000, visibility: true }))
              .then(() => page.waitFor(150))
              .then(() => page.type('#login', sId))
              .then(() => page.type('#password', pass))
              .then(() => page.click('#bLogin'))
              .then(() => browser)))

    return {

      retrieve: (callback) => {
        retriever = callback
      },

      scrape: (lit) => {
        queue.push(lit)
      },

      close: () => {
        browser.close()
      }
    }

    function handlePopup(target) {
      [ popup, encses ] = Promise.resolve(target.page())
        .then(popup => popup.setViewport({ width: 1000, height: 700 })
          .then(() => popup.waitForSelector('#encses', { timeout: 10000 }))
          .then(() => popup.$('#encses'))
          .then(dom => dom.getProperty('value'))
          .then(v => v.jsonValue())
          .then(encses => (encses) 
            ? popup.waitForSelector('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
              .then(() => popup.click('a[data-nav="sfgradebook001.w"]'))
              .then(() => popup.waitForSelector('a[name="showGradeInfo"]'))
              .then(() => [ popup, encses ])
            : [ 0, 0 ]))
    }

    function handleResponse(response) {
      loginInfo = response.text()
        .then((text) =>
          (text.substring(0, 4) === '<li>') ? text.slice(4, -5).split('^') : 0)
    }

    function query(info, origin, encses, data) {

      const req = new XMLHttpRequest()
    
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
  }

module.exports = Scraper
    
// .then(() => popup.$$eval('a[name="showGradeInfo"]', links => 
//   links.map(a => ({

//   eid: a.getAttribute('data-eid'),
//   cni: a.getAttribute('data-cni'),
//   trk: a.getAttribute('data-trk'),
//   sec: a.getAttribute('data-sec'),
//   gid: a.getAttribute('data-gid'),
//   bkt: a.getAttribute('data-bkt'),
//   eoc: a.getAttribute('data-eoc')
// })))
// .mapSeries(data => popup.evaluate(query, loginInfo, referer, encses, data))