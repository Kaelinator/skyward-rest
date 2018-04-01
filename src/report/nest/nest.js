
const { switchcase } = require('../../lib/helpers').structures
const {
  insertData, objectAssign, nestData, nestDataArray
} = require('./nest-components')

const merge = (arr, obj) => switchcase({
  'cat': insertData(arr),
  'lit': nestData(arr),
  'assignment': nestData(arr),
  'banner': insertData(arr),
  'strip': nestDataArray(arr),
  'year': objectAssign(arr),
  'other': arr
})(arr)(obj.type)(obj)

module.exports = data => data.reduce(merge, [])