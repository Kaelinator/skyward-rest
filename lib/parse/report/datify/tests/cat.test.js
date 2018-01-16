
const cat           = require('../cat')
const { data, raw } = require('./data/cat.data.js')
const testPrep      = require('./prepare')

describe('Creates an object containing category data', () => {

  it('Minor with one assignment', () => {
    const tr = testPrep(raw.PR1[0])

    expect(cat(tr)).toEqual(data.PR1[0])
  })

  it('Major with zero assignments', () => {
    const tr = testPrep(raw.PR1[1])

    expect(cat(tr)).toEqual(data.PR1[1])
  })

  it('Homework with a score breakdown', () => {
    const tr = testPrep(raw.S1[0])

    expect(cat(tr)).toEqual(data.S1[0])
  })
})