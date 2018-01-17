
const breakdown       = require('./parse/breakdown')
const info            = require('./parse/info')
const prepare         = require('./parse/prepare')
const report          = require('./parse/report')
const { arrayInsert } = require('./parse/helpers')
const { compose }     = require('./helpers')

const formData = $ => ({
  info: info($),
  breakdown: breakdown($),
  report: report($)
})

const course = (data, xml) => compose(
  arrayInsert(data),
  formData,
  prepare
)(xml)

const history = (data, xml) => compose(
  prepare
)

module.exports = {
  course,
  history
}