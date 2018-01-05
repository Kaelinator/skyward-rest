
const { arrayInsert }                 = require('../helpers')
const { compose, mapObj, switchcase } = require('../../helpers')

const objectInsert = data => newData =>
  mapObj(data, 
    (v, k) => newData.hasOwnProperty(k) ? arrayInsert(v)(newData[k]) : v
  )

const stripData = obj => obj.data

const insertCat = arr => compose(
  arrayInsert(arr),
  stripData
)

const nestData = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  objectInsert(arr.slice(-1)[0]),
  stripData
)

const merge = (arr, obj) => switchcase({
  'cat': insertCat(arr),
  'lit': nestData(arr),
  'assignment': nestData(arr),
  'empty': arr
})(arr)(obj.type)(obj)

module.exports = data => data.reduce(merge, [])