
const { grab }    = require('./helpers')
const { compose } = require('../helpers')

const grabHeader = $ => grab($('h2.gb_heading')[0])(0)
const grabLit = $ => grab($('table[id*="stuTermSummaryGrid"]>thead>tr>th')[0])(0)('data')
const trim = str => str.match(/\w+/)[0]
const getLit = compose(
  trim,
  grabLit
)
const formInfo   = $ => ({
  lit: getLit($),
  course: grabHeader($)(0)(0)('data'),
  period: grabHeader($)(2)(1)(0)('data'),
  instructor: grabHeader($)(4)(0)('data')
})

module.exports = compose(
  formInfo
)