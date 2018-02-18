
const mod          = require('../lib/helpers').modifiers
const { getScore } = require('../lib/helpers').scrapers
const { compose }  = require('../lib/helpers').structures
const { ensure }   = require('../lib/helpers').traversers

const formLitWeight = tr => ({
  percent: ensure(tr, 1, 1, 0).get('data')
})

const createLitWeight = compose(
  mod.numericValues,
  mod.trimValues(/\d{2,}/),
  formLitWeight
)

const getLitWeight = tr => ensure(tr, 1, 1, 0).exists() ? createLitWeight(tr) : null
const getLit = tr => ({ 
  lit: ensure(tr, 1, 0, 0).get('data') 
})

const labelLit = tr => value => Object.assign(getLit(tr), value)
const wrapLit = ([ data, tr ]) => mod.mapObj(data, labelLit(tr))
const formLit = tr => [{
  weight: getLitWeight(tr),
  score: getScore(tr)
}, tr]

module.exports = compose(
  mod.objectify('lit'),
  wrapLit,
  formLit
)