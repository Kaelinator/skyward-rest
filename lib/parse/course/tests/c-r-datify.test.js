
const assignment    = require('../c-r-d-assignment')
const cat           = require('../c-r-d-cat')
const { compose }   = require('../../../helpers/sky-utils').structures
const { data, raw } = require('./data/c-r-datify.data.js')
const lit           = require('../c-r-d-lit')
const prep          = require('../../prep')

const prepare = compose(
  $ => $('tr')[0],
  prep.jQueryify
)

describe('assignment creates an object from a tr', () => {
  
  it('PR1 - 100/100', () => {
    const tr = prepare(raw.assignment.PR1[0])
    
    expect(assignment(tr)).toEqual(data.assignment.PR1[0])
  })

  it('Q1 - Absent', () => {
    const tr = prepare(raw.assignment.Q1[1])
    
    expect(assignment(tr)).toEqual(data.assignment.Q1[1])
  })

  it('Q1 - No count', () => {
    const tr = prepare(raw.assignment.Q1[5])
    
    expect(assignment(tr)).toEqual(data.assignment.Q1[5])
  })

  it('S1 - No count & absent', () => {
    const tr = prepare(raw.assignment.S1[4])
    
    expect(assignment(tr)).toEqual(data.assignment.S1[4])
  })
})

describe('cat creates an object containing category data', () => {

  it('Minor with one assignment', () => {
    const tr = prepare(raw.cat.PR1[0])

    expect(cat(tr)).toEqual(data.cat.PR1[0])
  })

  it('Major with zero assignments', () => {
    const tr = prepare(raw.cat.PR1[1])

    expect(cat(tr)).toEqual(data.cat.PR1[1])
  })

  it('Homework with a score breakdown', () => {
    const tr = prepare(raw.cat.S1[0])

    expect(cat(tr)).toEqual(data.cat.S1[0])
  })
})

describe('lit creates a part of the breakdown for a category', () => {

  it('Homework', () => {
    const tr = prepare(raw.lit.S1[3])

    expect(lit(tr)).toEqual(data.lit.S1[3])
  })

  it('Major', () => {
    const tr = prepare(raw.lit.S1[4])

    expect(lit(tr)).toEqual(data.lit.S1[4])
  })

  it('Minor', () => {
    const tr = prepare(raw.lit.S1[5])

    expect(lit(tr)).toEqual(data.lit.S1[5])
  })

})