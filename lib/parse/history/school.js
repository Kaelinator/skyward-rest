
const { grab } = require('../helpers')
const { compose } = require('../../helpers')

const getSchool = $ => grab($('.sfTag')[0])(0)('data')

module.exports = compose(
  getSchool
)