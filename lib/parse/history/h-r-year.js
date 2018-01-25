
const { ensure, grab } = require('../../helpers/sky-utils').traversers
const { compose } = require('../../helpers/sky-utils').structures

const grabTable = $ => $('.fixedRows>table[id^="grid_gradeGrid"]>tbody')
const grabText = tbody => grab(tbody)(0)(0)(0)('children')()



module.exports = f => compose(
  grabText,
  grabTable
)