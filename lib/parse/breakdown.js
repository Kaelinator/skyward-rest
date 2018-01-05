
const { ensure, grab, trimValues } = require('./helpers')
const { compose } = require('../helpers')

const grabSummary = $ => $('td[class="nPtb"]').get()
const onlyParents = summary => summary.filter(td => ensure(td)(0)(0)())
const breakItDown = summary => summary.map(td => ({
  lit: grab(td)(0)(0)(0)('data'),
  grade: grab(td)(1)(0)('data'),
  percent: grab(td)(2)(0)('data')
}))
const trimEmDown  = summary => summary.map(trimValues(/\w+/))
const emptyToNull  = summary => (summary.length > 0) ? summary : null

module.exports = compose(
  emptyToNull,
  trimEmDown,
  breakItDown,
  onlyParents,
  grabSummary
)