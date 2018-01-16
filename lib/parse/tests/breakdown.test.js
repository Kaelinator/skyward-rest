
const breakdown = require('../breakdown')
const data      = require('./data/breakdown.data.js')
const prepare   = require('../prepare')
const raw       = require('../../../tests/raw.data.js')

describe('Should get a course\'s breakdown based upon a specific lit', () => {

  it('PR1 - No breakdown', () => {
    const $ = prepare(raw.PR1[0])

    expect(breakdown($)).toBeNull()
  })

  it('Q1 - No breakdown', () => {
    const $ = prepare(raw.Q1[3])

    expect(breakdown($)).toBeNull()
  })

  it('S1 - Breakdown, no exam', () => {
    const $ = prepare(raw.S1[0])

    expect(breakdown($)).toEqual(data.S1[0])
  })

  it('S1 - Full breakdown', () => {
    const $ = prepare(raw.S1[3])

    expect(breakdown($)).toEqual(data.S1[3])
  })
})
