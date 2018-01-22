
const { compose } = require('../../helpers/sky-utils').structures
const { grab }    = require('../../helpers/sky-utils').traversers

const getSchool = $ => grab($('.sfTag')[0])(0)('data')
const trim = str => str.match(/\((.*)\)$/)[1]

module.exports = compose(
  trim,
  getSchool
)