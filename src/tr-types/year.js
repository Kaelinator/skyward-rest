
const { objectify }    = require('../lib/helpers').modifiers
const { ensure, grab } = require('../lib/helpers').traversers

module.exports = f => ensure(f)(0)(0)(0)()
  ? objectify('year')(grab(f)(0)(0)(0)('data'))
  : null