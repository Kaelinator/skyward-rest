
const breakdown       = require('./parse/course/breakdown')
const info            = require('./parse/course/info')
const prepare         = require('./parse/prepare')
const report          = require('./parse/course/report')
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