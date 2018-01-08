
const { ensure, grab, nums, trimValues } = require('../helpers')
const { compose, mapObj }                = require('../../helpers')

const objectify = type => data => ({ type, data })

const formScore = td => ({
  earned: td(0)('data'),
  total: td(2)('data')
})
const createScore = compose(
  nums,
  trimValues(/\w+|\*/),
  formScore
)
const getScore = td => ensure(td)(1)() ? createScore(td) : []

const fixEmpties = meta => mapObj(meta, data => 
  (data === String.fromCharCode(160)) ? null : data
)
const formMeta = tr => ({
  missing: grab(tr)(5)(0)('data'),
  noCount: !ensure(tr)(6)(0)('data'),
  absent: grab(tr)(7)(0)('data')
})
const getMeta = compose(
  fixEmpties,
  formMeta
)

const getDate = tr => ensure(tr)(0)(0)() ? new Date(grab(tr)(0)(0)('data')) : null
const getTitle = tr => ensure(tr)(1)(0)(0)() ? grab(tr)(1)(0)(0)('data') : null
const formAssignment = tr => ({
  assignments: {
    date: getDate(tr),
    title: getTitle(tr),
    score: getScore(grab(tr)(4)),
    meta: getMeta(tr)
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
  nums,
  trimValues(/\w+/),
  trimValues(/\d{2,}/),
  formCat
)

const formLitWeight = tr => ({
  percent: tr(1)(0)('data')
})
const createLitWeight = compose(
  nums,
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

module.exports = trs => trs.map(contextify)