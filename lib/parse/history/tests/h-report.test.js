
const year    = require('../h-r-year')
const data    = require('./data/h-report.data.js')
const cheerio = require('cheerio')
const { raw } = require('../../tests/parser.data.js')

describe('year should grab the year and grade level', () => {

  it('works')
  // it('Year 11', () => {
  //   const $ = cheerio.load(raw.history[0])
    
  //   expect(year($)).toEqual(data.year[0])
  // })
})
