
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

const course = (arr, xml) => compose(
  arrayInsert(arr),
  formData,
  prepare.course
)(xml)

const history = (arr, html) => compose(
  arrayInsert(arr),
  prepare.history
)(html)

module.exports = {
  course,
  history
}