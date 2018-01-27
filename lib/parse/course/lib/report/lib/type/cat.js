
const { trimValues, objectify } = require('../../../../../../helpers').modifiers
const { nums, getScore }        = require('../../../../../../helpers').scrapers
const { compose }               = require('../../../../../../helpers').structures
const { ensure, grab }          = require('../../../../../../helpers').traversers

const getCatWeight = tr => ensure(tr)(2)()
  ? tr(2)(0)('data')
  : []

const formCat = tr => ({
  category: grab(tr)(1)(0)('data'),
  weight: getCatWeight(grab(tr)(1)),
  score: getScore(grab(tr)(4)),
  assignments: []
})

module.exports = compose(
  objectify('cat'),
  nums,
  trimValues(/\w+/),
  trimValues(/\d{2,}/),
  formCat
)