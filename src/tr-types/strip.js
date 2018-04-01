
const { map, objectify, wrap } = require('../lib/helpers').modifiers
const { compose } = require('../lib/helpers').structures
const { ensure }  = require('../lib/helpers').traversers


const getValue = td => ensure(td, 0).get('data')

const handleEmpties = score => (score === '&nbsp;' || score === ' ') 
  ? null 
  : score

const grabScores = tr => (tr && tr.children)
  ? tr.children
  : []

module.exports = compose(
  objectify('strip'),
  map(handleEmpties),
  map(getValue),
  grabScores
)