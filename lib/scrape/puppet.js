const puppeteer = require('puppeteer')

const login = (url, sId, pass, instance, returnObj) => {

  return puppeteer.launch({ headless: false })
    .then(chrome => instance.browser = chrome)
    .then(chrome => chrome.on('targetcreated', awaitPopup(instance, returnObj)))
    .then(chrome => chrome.newPage())
    .then(page => page.goto(url)
      .then(() => page.on('response', awaitResponse(instance)))
      .then(() => page.waitForSelector('#bLogin', { timeout: 5000, visibility: true }))
      .then(() => page.waitFor(150))
      .then(() => page.type('#login', sId))
      .then(() => page.type('#password', pass))
      .then(() => page.click('#bLogin'))
      .then(() => page.waitFor(250))
      .then(() => page.waitForSelector('#dMessage', { hidden: true, timeout: 100 })
        .catch(() => { instance.iPromise.reject('Invalid login or password!') }))
    )
}

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

const awaitPopup = (instance, returnObj) => target => {

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
            .then(() => popup.$$eval(`a[name="showGradeInfo"]`, grabAttributes))
            .then(a => [ popup, encses, a ])
        : [ 0, 0, 0 ]
      )
    ).then(([ popup, encses, links ]) => {
      if (popup !== 0) {

        instance.skyward = popup
        instance.qData.encses = encses
        instance.courseLinks = links
        instance.iPromise.resolve(returnObj)
      }
    })
}

const awaitResponse = instance => response => {

  return response.text()
    .then(text => (text.substring(0, 4) === '<li>') 
      ? text.slice(4, -5).split('^') 
      : 0
    ).then(text => instance.qData.info = (text !== 0) 
      ? {
          dwd: text[0],
          sesId: text[1],
          wfaacl: text[2],
          stuId: text[4]
        }
      : text
    )
}

const handleResponse = response => {

  return response.text()
    .then(text => (text.substring(0, 4) === '<li>') 
      ? text.slice(4, -5).split('^') 
      : 0
    )
}

module.exports = {
  login
}