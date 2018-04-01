
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


module.exports = {
  stripData,
  insertData,
  objectInsert,
  nestData,
  nestArray
}