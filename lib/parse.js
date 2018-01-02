
const cheerio = require('cheerio')
const { compose, mapObj } = require('./helpers')

const grab = (parent) =>
  (n) => (typeof n === 'number') 
    ? grab(parent.children[n])
    : (typeof n === 'string') ? parent[n] : parent

const ensure = (parent) => {
  parent = (typeof parent === 'function') ? parent() : parent
  return (n) => (typeof n === 'number')
    ? (parent)
      ? (parent.children)
        ? ensure(parent.children[n])
        : ensure(parent.children)
      : ensure(parent)
    : ((typeof n === 'string' && parent) ? parent[n] : parent) !== undefined
}

const trimValues = regx => 
  obj => mapObj(obj, data => (typeof data === 'string') ? data.match(regx)[0] : data)

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
const trimEmDown  = summary => summary.map(trimValues(/\w+/))
const fixEmpties  = summary => (summary.length > 0) ? summary : null

const getGradeBreakdown = compose(
  fixEmpties,
  trimEmDown,
  breakItDown,
  onlyParents,
  grabSummary
)


const grabCategory = $ => $('.sf_Section.cat').get()
const honeElement  = cats => cats.map(cat => grab(cat))

const trimName       = name => name.trim()
const createCategory = category => ({ category, weights: [] })
const pushCategory   = into => data => [...into, data]
const insertCategory = into => compose(
  pushCategory(into),
  trimValues(/\w+/),
  createCategory
)

const getLit            = td => ensure(td)(0)(0)('data') ? td(0)(0)('data') : 'nothing'
const getPercent        = td => ensure(td)(1)(0)('data') ? td(1)(0)('data') : 'also nothing'
const createSubcategory = td => ({
  lit: getLit(td),
  weight: getPercent(td).slice(14)
})
const pushSubcategory   = into => data => [
  ...into.slice(0, -1), 
  Object.assign(into.slice(-1)[0], { weights: [ ...into.slice(-1)[0].weights, data ] })
]
const insertSubcategory = into => compose(
  pushSubcategory(into),
  trimValues(/\w+/),
  createSubcategory
)

const extractData = cats => cats.reduce((breakdown, tr) => ensure(tr)(1)(0)('data')
  ? insertCategory(breakdown)(tr(1)(0)('data'))
  : insertSubcategory(breakdown)(tr(1)), [])

const getCategoryBreakdown = compose(
  extractData,
  honeElement,
  grabCategory
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