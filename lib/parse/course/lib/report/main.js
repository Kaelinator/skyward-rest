
const { compose }               = require('../../../../helpers').structures

const nest       = require('./nest')
const datify     = require('./datify')

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

module.exports = compose(
  nest,
  datify,
  grabGrid
)