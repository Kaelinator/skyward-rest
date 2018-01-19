
const datify      = require('./c-r-datify')
const nest        = require('./c-r-nest')
const { compose } = require('../../helpers/sky-utils').structures

const grabGrid = $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get()

module.exports = compose(
  nest,
  datify,
  grabGrid
)