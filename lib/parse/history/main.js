
const { compose }     = require('../../helpers').structures
const { arrayInsert } = require('../../helpers').modifiers

const school = require('./lib/school')
const report = require('./lib/report')
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
