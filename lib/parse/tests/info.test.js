
const data    = require('./info.data.js')
const info    = require('../info')
const prepare = require('../prepare')
const raw     = require('../../../tests/raw.data.js')

describe('Should get a course\'s info', () => {

  it('PR1 - Period 1', () => {
    const $ = prepare(raw.PR1[0])

    expect(info($)).toEqual(data.PR1[0])
  })

  it('PR1 - Period 3', () => {
    const $ = prepare(raw.PR1[2])

    expect(info($)).toEqual(data.PR1[2])
  })

  it('S1 - Period 1', () => {
    const $ = prepare(raw.S1[0])

    expect(info($)).toEqual(data.S1[0])
  })

  it('S1 - Period 6', () => {
    const $ = prepare(raw.S1[5])

    expect(info($)).toEqual(data.S1[5])
  })

})
