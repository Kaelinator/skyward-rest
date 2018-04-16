
const { mapObj, arrayInsert } = require('../../lib/helpers').modifiers
const { compose, switchcase } = require('../../lib/helpers').structures
const arrify = require('arrify')

const stripData = obj => obj.data

const insertData = arr => compose(
  arrayInsert(arr),
  stripData
)

const objectInsert = data => newData =>
  mapObj(data, 
    (v, k) => newData.hasOwnProperty(k) ? arrayInsert(arrify(v))(newData[k]) : v
  )

const nestData = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  objectInsert(arr.slice(-1)[0]),
  stripData
)

const nestArray = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  insertData(arr.slice(-1)[0])
)

const labelValues = keys => arr => keys.map((k, i) => ({ [k]: arr[i] }))

const insertLast = arr1 => arr2 =>
  arrayInsert(arr1.slice(0, -1))(arrayInsert(arr1.slice(-1)[0])(arr2))

const labelArray = (arr) => compose(
  insertLast(arr),
  labelValues(arr[0][0]),
  stripData
)

// const assign = child => parent => Object.assign(parent, child)

// const arrAssign = (arr, k) => data => data.slice(1).map((d, i) => assign({[k]: d})(arr[i]))

const insertAndPair = (obj, key1, key2) => compose(
  // d => assign({ [key1]: arrAssign(obj.slice(-1)[0][key1], key2)(d) })(obj.slice(-1)),
  
  stripData
)

module.exports = {
  stripData,
  insertData,
  objectInsert,
  nestData,
  nestArray,
  labelArray,
  insertAndPair
}