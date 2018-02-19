
const { mapObj, arrayInsert } = require('../../lib/helpers').modifiers
const { compose, switchcase } = require('../../lib/helpers').structures

const objectInsert = data => newData =>
  mapObj(data, 
    (v, k) => newData.hasOwnProperty(k) ? arrayInsert(v)(newData[k]) : v
  )

const stripData = obj => obj.data

const insertData = arr => compose(
  arrayInsert(arr),
  stripData
)

const nestData = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  objectInsert(arr.slice(-1)[0]),
  stripData
)

const mapObjectArray = arr => obj => arr.map((nest, i) => {
  return objectInsert(nest)(obj[i])
})

const arrayObjectInsert = data => newData => 
  mapObj(data, (v, k) => newData.hasOwnProperty(k) 
    ? mapObjectArray(v)(newData[k]) 
    : v
  )

const nestDataArray = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  arrayObjectInsert(arr.slice(-1)[0]),
  stripData
)

const merge = (arr, obj) => switchcase({
  'cat': insertData(arr),
  'lit': nestData(arr),
  'assignment': nestData(arr),
  'banner': insertData(arr),
  'strip': nestDataArray(arr),
  'other': arr
})(arr)(obj.type)(obj)

module.exports = data => data.reduce(merge, [])