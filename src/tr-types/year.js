
const { objectify }    = require('../lib/helpers').modifiers
const { ensure } = require('../lib/helpers').traversers

module.exports = f => objectify('year')(ensure(f, 0, 0, 0).get('data'))