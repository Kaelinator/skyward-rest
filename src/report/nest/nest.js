
const {
  insertData, nestData, nestArray, insertAndPair
} = require('./nest-components')

const merge = (arr, data) => {

  switch (data.type) {

    case 'cat':
    case 'banner':
      return insertData(arr)(data)

    case 'year':
      return insertAndPair(arr, '__grades__')(data)

    case 'lit':
    case 'assignment':
    case 'course':
      return nestData(arr)(data)

    case 'strip':
      return nestArray(arr)(data)

    default:
      return arr
  }

}

module.exports = data => data.reduce(merge, [])