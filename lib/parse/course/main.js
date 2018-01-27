
const { compose }     = require('../../helpers').structures
const { arrayInsert } = require('../../helpers').modifiers

const info      = require('./lib/info')
const breakdown = require('./lib/breakdown')
const report    = require('./lib/report')
const prep      = require('../prep.js')

const prepare = compose(
  prep.jQueryify,
  prep.grabOutput,
  prep.cheerioify,
  prep.cleanupQuotes,
  prep.cleanupLines
)

const formCourse = $ => ({
  info: info($),
  breakdown: breakdown($),
  report: report($)
})

module.exports = (arr, xml) => compose(
  arrayInsert(arr),
  formCourse,
  prepare
)(xml)
