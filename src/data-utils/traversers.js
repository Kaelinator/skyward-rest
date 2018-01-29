
const ensure = (parent) => {
  parent = executeIfFunction(parent)
  return n => (typeof n === 'string' && parent)
    ? parent[n] !== undefined
    : (typeof n !== 'number')
    ? parent !== undefined
    : (!parent)
    ? ensure(parent)
    : (!parent.children)
    ? ensure(parent.children)
    : ensure(parent.children[n])
}

const executeIfFunction = (f, ...params) =>
  (typeof f === 'function') ? f(...params) : f

const grab = (parent) =>
  (n) => (typeof n === 'number') 
    ? grab(parent.children[n])
    : (typeof n === 'string')
    ? parent[n]
    : parent


module.exports = {
  ensure,
  executeIfFunction,
  grab
}
