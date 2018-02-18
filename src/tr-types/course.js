
const { objectify } = require('../lib/helpers').modifiers
const { compose }   = require('../lib/helpers').structures
const { ensure }    = require('../lib/helpers').traversers

const grabName = tr => ensure(tr, 0, 0).get('data') || ensure(tr, 0, 0, 0).get('data')

const formCourse = tr => ({
  courses: {
    name: grabName(tr),
    scores: [],
    terms: ensure(tr, 1, 0).get('data')
  }
})

module.exports = compose(
  objectify('course'),
  formCourse
)