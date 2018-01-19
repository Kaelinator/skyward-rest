
const { compose }     = require('../../helpers/sky-utils').structures
const { arrayInsert } = require('../../helpers/sky-utils').modifiers

const info      = require('./c-info')
const breakdown = require('./c-breakdown')
const report    = require('./c-report')
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
