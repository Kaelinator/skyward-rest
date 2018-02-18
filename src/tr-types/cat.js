
const { trimValues, objectify } = require('../lib/helpers').modifiers
const { nums, getScore }        = require('../lib/helpers').scrapers
const { compose }               = require('../lib/helpers').structures
const { ensure }          = require('../lib/helpers').traversers

const getCatWeight = tr => ensure(tr, 1, 2, 0).get('data') || []

const formCat = tr => ({
  category: ensure(tr, 1, 0).get('data'),
  weight: getCatWeight(tr),
  score: getScore(tr),
  assignments: []
})

module.exports = compose(
  objectify('cat'),
  nums,
  trimValues(/\w+/),
  trimValues(/\d{2,}/),
  formCat
)