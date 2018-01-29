
const { compose }     = require('../lib/helpers').structures
const { arrayInsert } = require('../lib/helpers').modifiers

const school       = require('./lib/school')
const report       = require('../report')
const { preppers } = require('../lib/helpers')

const prepare = compose(
  preppers.jQueryify,
  preppers.cleanupQuotes,
  preppers.cleanupLines
)

const formHistory = $ => ({
  school: school($),
  report: report($)
})

module.exports = (arr, html) => compose(
  arrayInsert(arr),
  formHistory,
  prepare
)(html)
