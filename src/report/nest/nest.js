
const {
  insertData,
  nestData,
  labelArray,
  insertAndPair
} = require('./nest-components')

const merge = (arr, data) => {

  switch (data.type) {

    case 'cat':
    case 'banner':
      return insertData(arr)(data)

    case 'year':
      return insertAndPair(arr, 'courses')(data)

    case 'lit':
    case 'assignment':
    case 'course':
      return nestData(arr)(data)

    case 'strip':
      return labelArray(arr)(data)

    default:
      return arr
  }

}

const finalize = e => {
  // TODO: shift the 2D array from __grades__ into courses[n].scores in
  // the correct format
  return e
}

module.exports = data => data.reduce(merge, []).map(finalize)