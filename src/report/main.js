
const { compose } = require('../lib/helpers').structures

const nest   = require('./lib/nest')
const classify = require('./lib/classify')

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()
const grabTable = $ => $('.fixedRows>table[id^="grid_gradeGrid"]>tbody>tr').get()

module.exports.course = compose(
  nest,
  tr => tr.map(classify),
  grabGrid
)

module.exports.history = compose(
  tr => tr.map(classify),
  grabGrid
)