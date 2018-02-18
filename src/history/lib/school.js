
const { compose } = require('../../../helpers').structures
const { ensure }    = require('../../../helpers').traversers

const getSchool = $ => ensure($('.sfTag')[0], 0).get('data')
const innerParens = str => str.match(/\((.*)\)$/)[1] || str

module.exports = compose(
  innerParens,
  getSchool
)