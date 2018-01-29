
const { compose } = require('../lib/helpers').structures

const nest   = require('./lib/nest')
const classify = require('./lib/classify')

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()
const grabTable = $ => $('.fixedRows>table[id^="grid_gradeGrid"]>tbody>tr').get()

module.exports.course = compose(
  nest,
  classify.course,
  grabGrid
)

module.exports.history = compose(
  classify.history,
  grabGrid
)