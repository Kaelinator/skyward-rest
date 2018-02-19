
const { compose }     = require('../lib/helpers').structures
const { arrayInsert } = require('../lib/helpers').modifiers

const info         = require('./lib/info')
const breakdown    = require('./lib/breakdown')
const report       = require('../report')
const { preppers } = require('../lib/helpers')

const prepare = compose(
  preppers.jQueryify,
  preppers.grabOutput,
  preppers.cheerioify,
  preppers.cleanupQuotes,
  preppers.cleanupLines
)

const grabData = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

const formCourse = $ => ({
  info: info($),
  breakdown: breakdown($),
  report: report(grabData($))
})

module.exports = (arr, xml) => compose(
  arrayInsert(arr),
  formCourse,
  prepare
)(xml)
