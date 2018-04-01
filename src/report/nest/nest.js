
const {
  insertData, nestData, nestArray
} = require('./nest-components')

const merge = (arr, obj) => {

  switch (obj.type) {
    case 'cat':
    case 'banner':
    case 'year':
      return insertData(arr)(obj)
    case 'lit':
    case 'assignment':
    case 'course':
      return nestData(arr)(obj)
    default:
      return arr
  }

}

module.exports = data => data.reduce(merge, [])