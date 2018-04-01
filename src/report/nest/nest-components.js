
const { mapObj, arrayInsert } = require('../../lib/helpers').modifiers
const { compose, switchcase } = require('../../lib/helpers').structures
const arrify = require('arrify')

const stripData = obj => obj.data

const insertData = arr => compose(
  arrayInsert(arr),
  stripData
)

const objectAssign = obj => newData => Object.assign(obj, newData)

const objectInsert = data => newData =>
  mapObj(data, 
    (v, k) => newData.hasOwnProperty(k) ? arrayInsert(arrify(v))(newData[k]) : v
  )

const nestData = arr => compose(
  arrayInsert(arr.slice(0, -1)),
  objectInsert(arr.slice(-1)[0]),
  stripData
)

const mapObjectArray = arr => obj =>
  arr.map((nest, i) => objectInsert(nest)(obj[i]))

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

module.exports = {
  stripData,
  insertData,
  objectAssign,
  objectInsert,
  nestData,
  mapObjectArray,
  arrayObjectInsert,
  nestDataArray
}