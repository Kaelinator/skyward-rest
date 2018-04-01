
const {
  numericValues,
  objectify,
  regX,
  // wrap
} = require('../lib/helpers').modifiers
const { compose } = require('../lib/helpers').structures
const { ensure } = require('../lib/helpers').traversers

const getYear = tr => ensure(tr, 0, 0, 0).get('data')

const formYear = str => ({
  courses: [],
  grade: regX(/\d+$/)(str),
  lits: [],
  year: regX(/\d{4}\s-\s\d{4}/)(str)
})

module.exports = compose(
  objectify('year'),
  // wrap('report'),
  numericValues,
  formYear,
  getYear
)
  