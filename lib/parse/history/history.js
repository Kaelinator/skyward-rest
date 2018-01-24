
const { compose }     = require('../../helpers/sky-utils').structures
const { arrayInsert } = require('../../helpers/sky-utils').modifiers

const school = require('./h-school')
const report = require('./h-report')
const prep   = require('../prep.js')

const prepare = compose(
  prep.jQueryify,
  prep.cleanupQuotes,
  prep.cleanupLines
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
