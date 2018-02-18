
const mod         = require('../lib/helpers').modifiers
const { compose } = require('../lib/helpers').structures
const { ensure }  = require('../lib/helpers').traversers

const getYear = tr => ensure(tr, 0, 0, 0).get('data')

const formYear = str => ({
  courses: [],
  grade: mod.regX(/\d+$/)(str),
  year: mod.regX(/\d{4}\s-\s\d{4}/)(str)
})

module.exports = compose(
  mod.objectify('year'),
  mod.numericValues,
  formYear,
  getYear
)
  