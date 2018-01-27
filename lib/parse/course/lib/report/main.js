
const { compose }               = require('../../../../helpers').structures

const nest       = require('./lib/nest')
const datify     = require('./lib/datify')

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

module.exports = compose(
  nest,
  datify,
  grabGrid
)