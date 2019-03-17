
const reportcard = require('./src/reportcard');
const gradebook = require('./src/gradebook');
const authenticate = require('./src/authenticate');
const history = require('./src/history');

module.exports = skywardURL => ({

  scrapeReport: (user, pass) => (
    authenticate(skywardURL)(user, pass)
      .then(auth => reportcard.fetch(skywardURL)(auth))
      .then((response) => ({
        raw: response.data,
        data: reportcard.getData(response)
      }))
  ),

  scrapeGradebook: (user, pass, { course, bucket }) => (
    authenticate(skywardURL)(user, pass)
      .then(auth => gradebook.fetch(skywardURL)(auth)(course, bucket))
      .then((response) => ({
        raw: response.data,
        data: gradebook.getData(response)
      }))
  ),

  scrapeHistory: (user, pass) => (
    authenticate(skywardURL)(user, pass)
      .then(history.fetch(skywardURL))
      .then((response) => ({
        raw: response.data,
        data: history.getData(response)
      }))
  )
})