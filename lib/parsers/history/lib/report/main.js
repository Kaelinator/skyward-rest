
const { ensure, grab } = require('../../../../helpers').traversers
const { compose }      = require('../../../../helpers').structures
const datify           = require('./lib/datify')

const grabTable = $ => $('.fixedRows>table[id^="grid_gradeGrid"]>tbody>tr').get()

module.exports = compose(
  datify,
  grabTable
)