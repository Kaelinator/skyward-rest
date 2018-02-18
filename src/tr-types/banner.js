
const { objectify } = require('../lib/helpers').modifiers
const { compose }   = require('../lib/helpers').structures
const { ensure }    = require('../lib/helpers').traversers

const grabLits = tr => (tr && tr.children)
  ? tr.children.map(td => ensure(td, 0, 0).get('data'))
  : []

const formLits = tr => ({
  lits: grabLits(tr)
})

module.exports = compose(
  objectify('banner'),
  formLits
)