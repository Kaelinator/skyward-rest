
const test  = require('tape')
const data  = require('./parser.data.js')
const parse = require('../lib/parse.js')

Object.keys(data)
  // .filter(lit => lit === 'PR1')
  // .filter(lit => lit === 'PR2')
  // .filter(lit => lit === 'Q1')
  // .filter(lit => lit === 'PR3')
  // .filter(lit => lit === 'PR4')
  // .filter(lit => lit === 'Q2')
  // .filter(lit => lit === 'S1')
  .forEach(lit => {
    console.log(lit)
    const parsed = data[lit].reduce(parse, [])
    console.log(parsed)
    // console.log(JSON.stringify(parsed, null, 2))
  })