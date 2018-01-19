
const { mapObj, trimValues, objectify } = require('../../helpers/sky-utils').modifiers
const { nums, getScore }                = require('../../helpers/sky-utils').scrapers
const { compose }                       = require('../../helpers/sky-utils').structures
const { ensure, grab }                  = require('../../helpers/sky-utils').traversers

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