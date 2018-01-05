
const cheerio = require('cheerio')
const { compose, mapObj, executeIfFunction, switchcase } = require('./helpers')

const grab = (parent) =>
  (n) => (typeof n === 'number') 
    ? grab(parent.children[n])
    : (typeof n === 'string') ? parent[n] : parent

const ensure = (parent) => {
  parent = executeIfFunction(parent)
  return (n) => (typeof n === 'number')
    ? (parent)
      ? (parent.children)
        ? ensure(parent.children[n])
        : ensure(parent.children)
      : ensure(parent)
    : ((typeof n === 'string' && parent) ? parent[n] : parent) !== undefined
}

const trimValues = regx =>
  obj => mapObj(obj, data =>
    (typeof data === 'string' && data.match(regx)) ? data.match(regx)[0] : data
  )

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
const emptyToNull  = summary => (summary.length > 0) ? summary : null

const getGradeBreakdown = compose(
  emptyToNull,
  trimEmDown,
  breakItDown,
  onlyParents,
  grabSummary
)


const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

const objectify = type => data => ({ type, data })

const formScore = td => ({
  earned: td(0)('data'),
  total: td(2)('data')
})
const createScore = compose(
  trimValues(/\w+|\*/),
  formScore
)
const getScore = td => ensure(td)(1)() ? createScore(td) : []

const getDate = tr => ensure(tr)(0)(0)() ? grab(tr)(0)(0)('data') : null
const getTitle = tr => ensure(tr)(1)(0)(0)() ? grab(tr)(1)(0)(0)('data') : null
const formAssignment = tr => ({
  assignments: {
    date: getDate(tr),
    title: getTitle(tr),
    score: getScore(grab(tr)(4))
  }
})
const createAssignment = compose(
  objectify('assignment'),
  formAssignment
)

const getCatWeight = tr => ensure(tr)(2)() ? tr(2)(0)('data') : []
const formCat = tr => ({
  category: grab(tr)(1)(0)('data'),
  weight: getCatWeight(grab(tr)(1)),
  score: getScore(grab(tr)(4)),
  assignments: []
})
const createCat = compose(
  objectify('cat'),
  trimValues(/\w+/),
  trimValues(/\d{2,}/),
  formCat
)

const formLitWeight = tr => ({
  percent: tr(1)(0)('data')
})
const createLitWeight = compose(
  trimValues(/\d{2,}/),
  formLitWeight
)
const getLitWeight = tr => ensure(tr)(1)(0)() ? createLitWeight(tr) : null
const getLit = tr => ({ 
  lit: grab(tr)(1)(0)(0)('data') 
})
const labelLit = tr => value => Object.assign(getLit(tr), value)
const wrapLit = ([ data, tr ]) => mapObj(data, labelLit(tr))
const formLit = tr => [{
  weight: getLitWeight(grab(tr)(1)),
  score: getScore(grab(tr)(4))
}, tr]
const createLit = compose(
  objectify('lit'),
  wrapLit,
  formLit
)

const assignmentOrEmpty = tr => ensure(tr)(4)() ? createAssignment(tr) : objectify('empty')({})
const litOrCat = tr => ensure(tr)(1)(0)(0)() ? createLit(tr) : createCat(tr)
const contextify = tr => (tr.attribs.class === 'sf_Section cat') ? litOrCat(tr) : assignmentOrEmpty(tr)

const datify = trs => trs.map(contextify)

const arrayInsert = arr => data => [ ...arr, data ]
const objectInsert = data => newData =>
  mapObj(data, (v, k) => newData.hasOwnProperty(k) ? arrayInsert(v)(newData[k]) : v)

const stripData = obj => obj.data

const insertCat = (arr) => compose(
  arrayInsert(arr),
  stripData
)
const nestData = (arr) => compose(
  arrayInsert(arr.slice(0, -1)),
  objectInsert(arr.slice(-1)[0]),
  stripData
)

const merge = (arr, obj) => switchcase({
  'cat': insertCat(arr),
  'lit': nestData(arr),
  'assignment': nestData(arr),
  'empty': arr
})(arr)(obj.type)(obj)

const nest = data => data.reduce(merge, [])

const compileReport = compose(
  nest,
  datify,
  grabGrid
)

const formData = $ => ({
  info: getInfo($),
  breakdown: getGradeBreakdown($),
  report: compileReport($)
})

const parse = module.exports = (data, xml) => compose(
  arrayInsert(data),
  formData,
  prepareAndCheerio
)(xml)