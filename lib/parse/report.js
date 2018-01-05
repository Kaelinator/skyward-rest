
const datify      = require('./report/datify')
const nest        = require('./report/nest')
const { compose } = require('../helpers')

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

module.exports = compose(
  nest,
  datify,
  grabGrid
)