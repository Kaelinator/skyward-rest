// $('.fixedRows>table[id^="grid_gradeGrid"]')

const { compose } = require('../../helpers/sky-utils').structures

const year = require('./h-r-year')

const formReport = $ => ({
  year: year($),
  courses: [] // TODO
})

module.exports = f => f