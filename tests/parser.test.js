
const parse = require('../lib/parser')
const raw   = require('./raw.data.js')
const util  = require('util')

Object.keys(raw)
  // .filter(lit => lit === 'PR4')
  .forEach(lit => {
    const data = raw[lit].reduce(parse, [])
    console.log(util.inspect(data, { depth: 7, colors: true }))
  })
