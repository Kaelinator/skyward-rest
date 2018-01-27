
const { compose } = require('../../../helpers').structures
const { grab }    = require('../../../helpers').traversers

const getSchool = $ => grab($('.sfTag')[0])(0)('data')
const innerParens = str => str.match(/\((.*)\)$/)[1] || str

module.exports = compose(
  innerParens,
  getSchool
)