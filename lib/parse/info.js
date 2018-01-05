
const { grab } = require('./helpers')
const { compose } = require('../helpers')

const grabHeader = $ => grab($('h2.gb_heading')[0])(0)
const formInfo = header => ({
  course: header(0)(0)('data'),
  period: header(2)(1)(0)('data'),
  instructor: header(4)(0)('data')
})

module.exports = compose(
  formInfo,
  grabHeader
)