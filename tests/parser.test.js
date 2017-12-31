
const test  = require('tape')
const data  = require('./parser.data.js')
const parse = require('../lib/parse.js')

Object.keys(data).forEach(lit => {
  console.log(lit)
  const parsed = data[lit].reduce(parse, [])
  console.log(parsed)
})