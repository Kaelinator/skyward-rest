
const arrayInsert = arr => data => [...arr, data]

const map = predicate => arr => arr.map(predicate)

/**
 * @author Rotareti
 * https://stackoverflow.com/a/38829074/5563110
 */
const mapObj = (obj, f) => (obj.length !== 0)
  ? Object.assign(...Object.entries(obj).map(([ k, v ]) => ({ [k]: f(v, k) })))
  : []

const numericValues = obj => mapObj(obj, n => Number(n) || n)

const objectify = type => data => ({ type, data })

const regX = r => data => (typeof data === 'string' && data.match(r))
  ? data.match(r)[0] 
  : data

const trimValues = regexp =>
  obj => mapObj(obj, regX(regexp))

const wrap = name => data => ({ [name]: data })

module.exports = {
  arrayInsert,
  map,
  mapObj,
  numericValues,
  objectify,
  regX,
  trimValues,
  wrap
}
