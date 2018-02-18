
const { mapObj, trimValues, objectify } = require('../lib/helpers').modifiers
const { nums, getScore }                = require('../lib/helpers').scrapers
const { compose }                       = require('../lib/helpers').structures
const { ensure }                  = require('../lib/helpers').traversers

const formLitWeight = tr => ({
  percent: ensure(tr, 1, 1, 0).get('data')
})

const createLitWeight = compose(
  nums,
  trimValues(/\d{2,}/),
  formLitWeight
)

const getLitWeight = tr => ensure(tr, 1, 1, 0).exists() ? createLitWeight(tr) : null
const getLit = tr => ({ 
  lit: ensure(tr, 1, 0, 0).get('data') 
})

const labelLit = tr => value => Object.assign(getLit(tr), value)
const wrapLit = ([ data, tr ]) => mapObj(data, labelLit(tr))
const formLit = tr => [{
  weight: getLitWeight(tr),
  score: getScore(tr)
}, tr]

module.exports = compose(
  objectify('lit'),
  wrapLit,
  formLit
)