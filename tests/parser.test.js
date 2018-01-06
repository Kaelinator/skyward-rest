
const parse       = require('../lib/parser')
const test        = require('tape')
// const { compose } = require('../lib/helpers')

const parsed = require('./parsed.data.js')
const raw    = require('./raw.data.js')
const util   = require('util')

Object.keys(raw).forEach(lit => {
  const data = raw[lit].reduce(parse, [])
  console.log(util.inspect(data, { depth: 7 }))
})

// const format = compose(
//   str => `${str}` + 'Hello',
//   data => JSON.stringify(data)
// )

// test('Parser', t => {

//   t.plan(Object.keys(raw).length)

//   Object.keys(raw).forEach(lit => {

//     const data = format(raw[lit].reduce(parse, []))

//     t.equal(data, parsed[lit])
//   })
// })
