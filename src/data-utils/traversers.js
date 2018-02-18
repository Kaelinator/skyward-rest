
const ensure = (parent, ...path) => {

  const target = path.reduce(safeTraverse, parent)

  return {

    exists: () => !!target,

    get: attr => (!attr) 
      ? target
      : target && target[attr] || null,

    attrsMatch: attrs => (!target || !attrs || typeof attrs !== 'object')
      ? false
      : Object.entries(attrs).every(matches(target.parent.attribs))
  }
}

const matches = (target) => (attr) => target[attr[0]] === attr[1]

const safeTraverse = (parent, child) => 
  parent && parent.children && parent.children[child]

const executeIfFunction = (f, ...params) =>
  (typeof f === 'function') ? f(...params) : f

module.exports = {
  ensure,
  executeIfFunction
}
