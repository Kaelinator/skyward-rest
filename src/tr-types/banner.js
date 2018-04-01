
const { objectify } = require('../lib/helpers').modifiers
const { compose }   = require('../lib/helpers').structures
const { ensure }    = require('../lib/helpers').traversers

const formLit = td => ensure(td, 0, 0).get('data')

const grabLits = tr => (tr && tr.children)
  ? tr.children.map(formLit)
  : []

const formLits = tr => [grabLits(tr)]

module.exports = compose(
  objectify('banner'),
  formLits
)