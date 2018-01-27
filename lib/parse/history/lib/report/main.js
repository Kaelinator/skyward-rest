
const { ensure, grab } = require('../../../helpers').traversers
const { compose }      = require('../../../helpers').structures

const grabTable = $ => $('.fixedRows>table[id^="grid_gradeGrid"]>tbody>tr').get()

module.exports = f => f