
const breakdown       = require('./parse/course/breakdown')
const info            = require('./parse/course/info')
const prepare         = require('./parse/prepare')
const school = require('./parse/history/school')
const report          = require('./parse/course/report')
const { arrayInsert } = require('./parse/helpers')
const { compose }     = require('./helpers')

const formCourse = $ => ({
  info: info($),
  breakdown: breakdown($),
  report: report($)
})

const course = (arr, xml) => compose(
  arrayInsert(arr),
  formCourse,
  prepare.course
)(xml)

const formHistory = $ => ({
  school: school($)
})

const history = (arr, html) => compose(
  arrayInsert(arr),
  formHistory,
  prepare.history
)(html)

module.exports = {
  course,
  history
}