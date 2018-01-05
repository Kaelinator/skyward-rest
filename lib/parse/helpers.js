
const { executeIfFunction, mapObj } = require('../helpers')

const arrayInsert = arr => data => [ ...arr, data ]

const ensure = (parent) => {
  parent = executeIfFunction(parent)
  return (n) => (typeof n === 'number')
    ? (parent)
      ? (parent.children)
        ? ensure(parent.children[n])
        : ensure(parent.children)
      : ensure(parent)
    : ((typeof n === 'string' && parent) ? parent[n] : parent) !== undefined
}

const grab = (parent) =>
  (n) => (typeof n === 'number') 
    ? grab(parent.children[n])
    : (typeof n === 'string') ? parent[n] : parent

const trimValues = regx =>
  obj => mapObj(obj, data =>
    (typeof data === 'string' && data.match(regx)) ? data.match(regx)[0] : data
  )

module.exports = {
  arrayInsert,
  ensure,
  grab,
  trimValues
}