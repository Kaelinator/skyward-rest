
const { arrayInsert } = require('../../lib/helpers').modifiers
const {
  insertData,
  nestData,
  labelArray,
  nestArray,
  insertAndPair
} = require('./nest-components')

const merge = (arr, data) => {

  switch (data.type) {

    case 'cat':
    case 'banner':
      return insertData(arr)(data)

    case 'year':
      return nestArray(arr)(data)
      // insertAndPair(arr, 'courses', 'scores')(data)

    case 'lit':
    case 'assignment':
    case 'course':
      return nestData(arr)(data)

    case 'strip':
      return labelArray(arr)(data)

    default:
      return arr
  }

}

module.exports = data => data.reduce(merge, [])