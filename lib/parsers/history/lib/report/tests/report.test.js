
const cheerio = require('cheerio')

const report = require('../main')
const year = require('../lib/types/year')

const data    = require('./report.data.js')
const { raw } = require('../../../../tests/parser.data.js')

describe('report should create a comprehensive object of all grades', () => {
  it('handles dates', () => {
    // const $ = cheerio.load(raw.history[0])

    // expect(report($)).toEqual(data.report[0])
  })
})

describe('year should grab the year and grade level from a tr', () => {

  it('works', () => {
    const tr = cheerio.load(data.year.raw[0])('tr').get(0)

    expect(year(tr)).toEqual(data.year.data[0])
  })
})
