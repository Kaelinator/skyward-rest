
const { ensure }    = require('../../../../../helpers').traversers
const { objectify } = require('../../../../../helpers').modifiers

const course = require('./types/course')
const year   = require('./types/year')

const contextify = tr => (tr.attribs.class === 'even')
  ? course(tr)
  : ensure(tr)(0)(0)(0)()
  ? year(tr)
  : objectify('empty')(tr)

module.exports = trs => trs.map(contextify)