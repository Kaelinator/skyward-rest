
const data  = require('./parser.data.js')
const parse = require('../lib/parse.js')
const Promise = require('bluebird')
const test  = require('tape')
const util = require('util')

Object.keys(data)
  // .filter(lit => lit === 'PR1')
  // .filter(lit => lit === 'PR2')
  // .filter(lit => lit === 'Q1')
  // .filter(lit => lit === 'PR3')
  // .filter(lit => lit === 'PR4')
  // .filter(lit => lit === 'Q2')
  .filter(lit => lit === 'S1')
  .forEach(lit => {
    const parsed = data[lit].reduce(parse, [])
    console.log(util.inspect(parsed, {
      depth: 7,
      colors: true,
      breakLength: 30
    }))
  })