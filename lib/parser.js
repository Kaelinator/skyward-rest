
const { arrayInsert } = require('./parse/helpers')
const breakdown       = require('./parse/breakdown')
const info            = require('./parse/info')
const report          = require('./parse/report')
const prepare         = require('./parse/prepare')
const { compose } = require('./helpers')

const formData = $ => ({
  info: info($),
  breakdown: breakdown($),
  report: report($)
})

module.exports = (data, xml) => compose(
  arrayInsert(data),
  formData,
  prepare
)(xml)