
const { objectify }    = require('../../../../../../helpers').modifiers
const { ensure, grab } = require('../../../../../../helpers').traversers

module.exports = f => ensure(f)(0)(0)(0)()
  ? grab(f)(0)(0)(0)('data')
  : null