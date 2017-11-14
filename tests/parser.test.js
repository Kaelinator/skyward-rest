
const test = require('tape')
const data = require('./parser.data.js')
const parse = require('../parser.js')

test('parsing test Q2', (t) => {
  const parsed = data.Q2.raw.map(x => parse(x, 'Q2'))
  t.deepEqual(parsed, data.Q2.parsed)
})