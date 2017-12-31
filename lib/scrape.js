const Promise   = require('bluebird')
const puppeteer = require('puppeteer')
const parse     = require('./parse')
const iPromise  = require('./iPromise')

const grabAttributes = (links) => 
  links.map(a => ({

    eid: a.getAttribute('data-eid'),
    cni: a.getAttribute('data-cni'),
    trk: a.getAttribute('data-trk'),
    sec: a.getAttribute('data-sec'),
    gid: a.getAttribute('data-gid'),
    bkt: a.getAttribute('data-bkt'),
    eoc: a.getAttribute('data-eoc')
  }))

const query = (info, origin, encses, data) => {

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

const Scraper = (url) =>
  (sId, pass) => {

    let loginInfo, secretCode, gradebook, browser

    const referer = url.split('/')
      .slice(0, -1)
      .concat('httploader.p?file=sfgradebook001.w')
      .join('/')

    const { promise, resolve } = iPromise()

    const obj = {

      scrape: (lit) => {

        return Promise.resolve(gradebook.$$eval(`a[data-lit="${lit}"]`, grabAttributes))
          .mapSeries(data => gradebook.evaluate(query, loginInfo, referer, secretCode, data))
          .reduce(parse, {})
      },

      close: () => {

        if (browser) browser.close()
      }
    }

    puppeteer.launch({ headless: false })
      .then(chrome => browser = chrome.on('targetcreated', handlePopup))
      .then(chrome => chrome.newPage())
      .then(page => page.goto(url)
        .then(() => page.on('response', handleResponse))
        .then(() => page.waitForSelector('#bLogin', { timeout: 5000, visibility: true }))
        .then(() => page.waitFor(150))
        .then(() => page.type('#login', sId))
        .then(() => page.type('#password', pass))
        .then(() => page.click('#bLogin'))
        .then(() => page.waitFor(250))
        .then(() => page.waitForSelector('#dMessage', { hidden: true, timeout: 100 })
          .catch(() => { throw new Error('Invalid login or password!') }))
      )

    return promise

    function handlePopup(e) {

      return awaitPopup(e).then(([ popup, encses ]) => {
          if (popup !== 0 && promise.isPending()) {

            gradebook = popup
            secretCode = encses
            resolve(obj)
          }
        })
    }

    function awaitPopup(target) {

      return target.page()
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
            : [ 0, 0 ]
          )
        )
    }

    function handleResponse(e) {

      return awaitResponse(e).then(text => loginInfo = (text === 0) ? loginInfo : text)
    }

    function awaitResponse(response) {

      return response.text()
        .then(text => (text.substring(0, 4) === '<li>') ? text.slice(4, -5).split('^') : 0)
    }

  }

module.exports = Scraper
