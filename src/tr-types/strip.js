
const { objectify } = require('../lib/helpers').modifiers
const { compose }   = require('../lib/helpers').structures
const { ensure }    = require('../lib/helpers').traversers

const grabScores = tr => (tr && tr.children)
  ? tr.children.map(td => ensure(td, 0).get('data'))
  : []

const wrap = name => data => ({ [name]: data })

const wrapAll = name => arr => arr.map(wrap(name))

module.exports = compose(
  objectify('strip'),
  wrap('lits'),
  wrapAll('scores'),
  grabScores
)