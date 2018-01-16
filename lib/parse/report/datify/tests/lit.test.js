
const lit = require('../lit')
const { data, raw } = require('./data/lit.data.js')
const testPrep = require('./prepare')

describe('Creates a part of the breakdown for a category', () => {

  it('Homework', () => {
    const tr = testPrep(raw.S1[3])

    expect(lit(tr)).toEqual(data.S1[3])
  })

  it('Major', () => {
    const tr = testPrep(raw.S1[4])

    expect(lit(tr)).toEqual(data.S1[4])
  })

  it('Minor', () => {
    const tr = testPrep(raw.S1[5])

    expect(lit(tr)).toEqual(data.S1[5])
  })

})