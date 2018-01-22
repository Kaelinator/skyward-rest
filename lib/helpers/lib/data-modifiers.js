
const arrayInsert = arr => data => [ ...arr, data ]


/**
 * @author Rotareti
 * https://stackoverflow.com/a/38829074/5563110
 */
const mapObj = (obj, f) => (obj.length !== 0)
  ? Object.assign(...Object.entries(obj).map(([ k, v ]) => ({ [k]: f(v, k) })))
  : []


const objectify = type => data => ({ type, data })

// const safeMatch = regex => group => str => {
//   const result = str.match(regex)
//   return result ? result[group] : result
// }

const trimValues = regx =>
  obj => mapObj(obj, data =>
    (typeof data === 'string' && data.match(regx)) ? data.match(regx)[0] : data
  )

module.exports = {
  arrayInsert,
  mapObj,
  objectify,
  trimValues
}
