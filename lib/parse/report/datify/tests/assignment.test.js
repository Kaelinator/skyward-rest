
const assignment    = require('../assignment')
const cheerio       = require('cheerio')
const { compose }   = require('../../../../helpers')
const { data, raw } = require('./assignment.data.js')

const testPrep = compose(
  $ => $('tr')[0],
  html => cheerio.load(html)
)

describe('Creates an assignment object from a tr', () => {
  
  it('PR1 - 100/100', () => {
    const tr = testPrep(raw.PR1[0])
    
    expect(assignment(tr)).toEqual(data.PR1[0])
  })

  it('Q1 - Absent', () => {
    const tr = testPrep(raw.Q1[1])
    
    expect(assignment(tr)).toEqual(data.Q1[1])
  })

  it('Q1 - No count', () => {
    const tr = testPrep(raw.Q1[5])
    
    expect(assignment(tr)).toEqual(data.Q1[5])
  })

  it('S1 - No count & absent', () => {
    const tr = testPrep(raw.S1[4])
    
    expect(assignment(tr)).toEqual(data.S1[4])
  })
})