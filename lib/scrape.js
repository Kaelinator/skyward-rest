const Promise      = require('bluebird')
const puppeteer    = require('puppeteer')
const parse        = require('./parser')
const { iPromise } = require('./helpers')

const grabAttributes = (links) => 
  links.map(a => ({

    lit: a.getAttribute('data-lit'),
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
    `stuId=${info.stuId}`,
    `entityId=${data.eid}`,
    `corNumId=${data.cni}`,
    `track=${data.trk}`,
    `section=${data.sec}`,
    `gbId=${data.gid}`,
    `bucket=${data.bkt}`,
    `dialogLevel=1`,
    `isEoc=${data.eoc}`,
    `ishttp=true`,
    `sessionid=${info.sesId}%15${info.wfaacl}`,
    `encses=${encses}`,
    `dwd=${info.dwd}`,
    `wfaacl=${info.wfaacl}`
  ].join('&'))

  return req.response
}

const Scraper = (url) =>
  (sId, pass) => {

    let loginInfo, encses, skyward, browser, assignmentLinks

    const referer = url.split('/')
      .slice(0, -1)
      .concat('httploader.p?file=sfgradebook001.w')
      .join('/')

    const { promise, resolve } = iPromise()

    const obj = {

      scrape: (...lit) => {

        return Promise.resolve(assignmentLinks)
          .filter(attr => (lit.length === 0) || lit.includes(attr.lit))
          .mapSeries(data => skyward.evaluate(query, loginInfo, referer, encses, data))
          .reduce(parse, [])
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

      return awaitPopup(e).then(([ popup, enc, links ]) => {
          if (popup !== 0) {

            skyward = popup
            encses = enc
            assignmentLinks = links
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
          .then(enc => (enc)
            ? popup.waitForSelector('a[data-nav="sfgradebook001.w"]', { timeout: 10000 })
                .then(() => popup.click('a[data-nav="sfgradebook001.w"]'))
                .then(() => popup.waitForSelector('a[name="showGradeInfo"]'))
                .then(() => popup.$$eval(`a[name="showGradeInfo"]`, grabAttributes))
                .then(a => [ popup, enc, a ])
            : [ 0, 0, 0 ]
          )
        )
    }

    function handleResponse(e) {

      return awaitResponse(e)
        .then(text => loginInfo = (text !== 0) 
        ? {
            dwd: text[0],
            sesId: text[1],
            wfaacl: text[2],
            stuId: text[4]
          }
        : text)
    }

    function awaitResponse(response) {

      return response.text()
        .then(text => (text.substring(0, 4) === '<li>') ? text.slice(4, -5).split('^') : 0)
    }

  }

module.exports = Scraper
