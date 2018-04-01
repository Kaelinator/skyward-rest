
const { compose } = require('../../lib/helpers').structures
const { ensure } = require('../../lib/helpers').traversers

const getSchool = $ => ensure($('.sfTag')[0], 0).get('data')
const innerParens = str => str.match(/\((.*)\)$/)[1] || str

module.exports = compose(
  innerParens,
  getSchool
)