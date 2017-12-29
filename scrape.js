const Promise   = require('bluebird')
const puppeteer = require('puppeteer')
const cheerio   = require('cheerio')

/**
 * https://repl.it/@justsml/UnpackedPromise
 */
const uPromised = () => {
  let resolve, reject, promise;
  promise = new Promise((yah, nah) => { resolve = yah; reject = nah })
  return { promise, resolve, reject }
}

const grabAttributes = (links) => links.map(a => ({
        
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

const parse = (xml) => {
  return xml
}

const Scraper = (url) =>
  (sId, pass) => {

    let loginInfo, encses, popup, browser

    const referer = url.split('/')
      .slice(0, -1)
      .concat('httploader.p?file=sfgradebook001.w')
      .join('/')

    const { promise, resolve } = uPromised()

    const obj = {

      scrape: (lit) => {

        return Promise.resolve(popup.$$eval(`a[data-lit="${lit}"]`, grabAttributes))
          .mapSeries(data => popup.evaluate(query, loginInfo, referer, encses, data))
        // .reduce(parse)
      },

      close: () => {
        if (browser) browser.close()
      }
    }

    puppeteer.launch()
      .then(chrome => {
        browser = chrome.on('targetcreated', e => {
          handlePopup(e).then(([ pop, enc ]) => {
              if (pop !== 0 && promise.isPending()) {

                popup = pop
                encses = enc
                resolve(obj)
              }
            })
          return chrome
        })
        return chrome
      })
      .then(chrome => 
        chrome.newPage()
          .then(page =>
            page.goto(url)
              .then(() => page.on('response', e => {
                handleResponse(e).then(text => {
                  loginInfo = (text === 0) ? loginInfo : text
                })
              }))
              .then(() => page.waitForSelector('#bLogin', { timeout: 5000, visibility: true }))
              .then(() => page.waitFor(150))
              .then(() => page.type('#login', sId))
              .then(() => page.type('#password', pass))
              .then(() => page.click('#bLogin'))
              .then(() => browser)))

    return promise

    function handlePopup(target) {

      return Promise.resolve(target.page())
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

      return response.text()
        .then((text) =>
          (text.substring(0, 4) === '<li>') ? text.slice(4, -5).split('^') : 0)
    }

  }

module.exports = Scraper
