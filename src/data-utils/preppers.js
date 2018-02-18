
const cheerio  = require('cheerio')
const { ensure } = require('./traversers')

const cleanupLines  = xml => xml.split('\n').join('')
const cleanupQuotes = xml => xml.split('\'').join('"')
const cheerioify    = xml => cheerio.load(xml, { xmlMode: true })
const grabOutput    = x => ensure(x('output')[0], 0, 0).get('data')
const jQueryify     = html => cheerio.load(html)

module.exports = {
  cheerioify,
  cleanupLines,
  cleanupQuotes,
  grabOutput,
  jQueryify
}