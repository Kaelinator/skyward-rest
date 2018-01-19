
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


const executeIfFunction = (f, ...params) =>
  (typeof f === 'function') ? f(...params): f


const grab = (parent) =>
  (n) => (typeof n === 'number') 
    ? grab(parent.children[n])
    : (typeof n === 'string') ? parent[n] : parent


module.exports = {
  ensure,
  executeIfFunction,
  grab
}
