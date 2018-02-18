
const { trimValues, objectify, numericValues } = require('../lib/helpers').modifiers
const { getScore }                             = require('../lib/helpers').scrapers
const { compose }                              = require('../lib/helpers').structures
const { ensure }                               = require('../lib/helpers').traversers

const getCatWeight = tr => ensure(tr, 1, 2, 0).get('data') || []

const formCat = tr => ({
  category: ensure(tr, 1, 0).get('data'),
  weight: getCatWeight(tr),
  score: getScore(tr),
  assignments: []
})

module.exports = compose(
  objectify('cat'),
  numericValues,
  trimValues(/\w+/),
  trimValues(/\d{2,}/),
  formCat
)