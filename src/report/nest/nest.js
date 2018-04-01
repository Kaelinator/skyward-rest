
const {
  insertData, nestData, nestArray
} = require('./nest-components')

const merge = (arr, data) => {

  switch (data.type) {
    case 'cat':
    case 'banner':
    case 'year':
      return insertData(arr)(data)
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