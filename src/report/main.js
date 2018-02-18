
const { compose } = require('../lib/helpers').structures

const nest     = require('./nest/nest')
const classify = require('./classify/classify')

module.exports = compose(
  nest,
  tr => tr.map(classify)
)