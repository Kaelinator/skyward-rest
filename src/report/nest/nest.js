
const { switchcase } = require('../../lib/helpers').structures
const {
  insertData, nestData, nestArray
} = require('./nest-components')

const merge = (arr, obj) => switchcase({
  'cat': insertData(arr),
  'lit': nestData(arr),
  'assignment': nestData(arr),
  'banner': insertData(arr),
  'strip': nestArray(arr),
  'year': insertData(arr),
  'course': nestData(arr),
  'other': arr
})(arr)(obj.type)(obj)

module.exports = data => data.reduce(merge, [])