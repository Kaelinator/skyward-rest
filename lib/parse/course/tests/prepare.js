
const cheerio     = require('cheerio')
const { compose } = require('../../../../../helpers')

module.exports = compose(
  $ => $('tr')[0],
  html => cheerio.load(html)
)