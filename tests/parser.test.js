
const test = require('tape')
const data = require('./parser.data.js')
const parse = require('../parser.js')

test('parsing test Q2', (t) => {
  const parsed = data.Q2.forEach(p => { 
    const obj = parse(p.inner, 'Q2')
    // console.log(JSON.stringify(obj, null, 2))
    // console.log(JSON.stringify(p.parsed, null, 2))
    t.deepLooseEqual(obj, p.parsed)
  })
})