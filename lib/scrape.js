const Promise            = require('bluebird')
const parse              = require('./parser')
const { iPromise }       = require('./helpers')
const query              = require('./scrape/query')
const { login, history } = require('./scrape/puppet')

const Scraper = (url) =>
  (sId, pass) => {

    const instance = {

      qData: {
        origin: gradeOrigin(url),
        info: null,
        encses: null,
      },
      iPromise: iPromise(),
      courseLinks: null,
      skyward: null,
    }

    const returnObj = {

      scrapeLegacy: () => {
        return Promise.resolve(history(instance))
          .reduce(parse.history, [])
      },

      scrape: (...lit) => {
        return Promise.resolve(instance.courseLinks)
          .filter(attr => (lit.length === 0) || lit.includes(attr.lit))
          .map(attr => instance.skyward.evaluate(query.course, instance.qData, attr))
          .reduce(parse.course, [])
      },

      close: () => {

        if (instance.browser) instance.browser.close()
      }
    }

    login(url, sId, pass, instance, returnObj)

    return instance.iPromise.promise
  }

function gradeOrigin(url) {
  return url.split('/')
    .slice(0, -1)
    .concat('httploader.p?file=sfgradebook001.w')
    .join('/')
}

module.exports = Scraper
