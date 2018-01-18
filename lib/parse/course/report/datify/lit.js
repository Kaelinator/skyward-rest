
const { compose, mapObj }                = require('../../../../helpers')
const { ensure, grab, nums, trimValues } = require('../../../helpers')
const { getScore, objectify }            = require('./helpers')

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

module.exports = compose(
  objectify('lit'),
  wrapLit,
  formLit
)