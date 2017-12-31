const cheerio = require('cheerio')
const compose = require('./compose')

const child = (parent) => {
  let grab
  return grab = (n) => 
    (typeof n === 'number') ? child(parent.children[n]) : parent[n]
}

const cleanupLines  = xml => xml.split('\n').join('')
const cleanupQuotes = xml => xml.split('\'').join('"')
const cheerioify    = xml => cheerio.load(xml, { xmlMode: true })
const grabOutput    = x => child(x('output')[0])(0)(0)('data')
const jQueryify     = html => cheerio.load(html)

const prepare = compose(
  jQueryify,
  grabOutput,
  cheerioify,
  cleanupQuotes,
  cleanupLines
)

const parse = module.exports = (obj, xml) => {

  const $ = prepare(xml)

  const header = child($('h2.gb_heading')[0])(0)

  const data = {
    course: header(0)(0)('data'),
    period: header(2)(1)(0)('data'),
    instructor: header(4)(0)('data')
  }

  const summary = $('td[class="nPtb"]')

  obj.push(summary)

  return obj
}