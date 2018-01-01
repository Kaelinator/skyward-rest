const cheerio = require('cheerio')
const { compose, mapObj } = require('./helpers')

const grab = (parent) =>
  (n) => (typeof n === 'number') ? grab(parent.children[n]) : parent[n]

const ensure = (parent) =>
  (n) => (typeof n === 'number')
  ? ensure(parent.children[n])
  : (typeof n === 'string') ? parent[n] : parent !== undefined

const cleanupLines  = xml => xml.split('\n').join('')
const cleanupQuotes = xml => xml.split('\'').join('"')
const cheerioify    = xml => cheerio.load(xml, { xmlMode: true })
const grabOutput    = x => grab(x('output')[0])(0)(0)('data')
const jQueryify     = html => cheerio.load(html)

const prepareAndCheerio = compose(
  jQueryify,
  grabOutput,
  cheerioify,
  cleanupQuotes,
  cleanupLines
)

const grabHeader = $ => grab($('h2.gb_heading')[0])(0)
const formInfo = header => ({
  course: header(0)(0)('data'),
  period: header(2)(1)(0)('data'),
  instructor: header(4)(0)('data')
})

const getInfo = compose(
  formInfo,
  grabHeader
)

const grabSummary = $ => $('td[class="nPtb"]').get()
const onlyParents = summary => summary.filter(td => ensure(td)(0)(0)())
const breakItDown = summary => summary.map(td => ({
  lit: grab(td)(0)(0)(0)('data'),
  grade: grab(td)(1)(0)('data'),
  percent: grab(td)(2)(0)('data')
}))
const trimItDown  = summary => summary.map(obj => mapObj(obj, data => data.match(/\w+/)[0]))
const fixEmpties  = summary => (summary.length > 0) ? summary : null

const getGradeBreakdown = compose(
  fixEmpties,
  trimItDown,
  breakItDown,
  onlyParents,
  grabSummary
)

const grabCatagory = $ => $('.sf_Section.cat').get()
const honeElement = cats => cats.map(tr => grab(tr)(1))
const extractData = cats => cats.reduce((breakdown, tr) => (tr('data'))
  ? tr('data') 
  : tr('children'), [])


const getCategoryBreakdown = compose(
  extractData,
  honeElement,
  grabCatagory
)

const formData = $ => ({
  info: getInfo($),
  breakdown: getGradeBreakdown($),
  assignments: {
    breakdown: getCategoryBreakdown($)
  }
})

const insert = (arr) => (data) => [ ...arr, data ]

const parse = module.exports = (data, xml) => compose(
  insert(data),
  formData,
  prepareAndCheerio
)(xml)