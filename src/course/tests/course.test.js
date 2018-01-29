
const { compose }  = require('../../lib/helpers').structures
const { preppers } = require('../../lib/helpers')

const data    = require('./course.data.js')
const { raw } = require('../../lib/tests/parser.data.js')

const breakdown = require('../lib/breakdown')
const info      = require('../lib/info')

const prepare = compose(
  preppers.jQueryify,
  preppers.grabOutput,
  preppers.cheerioify,
  preppers.cleanupQuotes,
  preppers.cleanupLines
)

describe('breakdown should get a course\'s breakdown based upon a specific lit', () => {

  it('PR1 - No breakdown', () => {
    const $ = prepare(raw.course.PR1[0])

    expect(breakdown($)).toBeNull()
  })

  it('Q1 - No breakdown', () => {
    const $ = prepare(raw.course.Q1[0])

    expect(breakdown($)).toBeNull()
  })

  it('S1 - Breakdown without exam', () => {
    const $ = prepare(raw.course.S1[0])

    expect(breakdown($)).toEqual(data.breakdown.S1[0])
  })

  it('S1 - Full breakdown', () => {
    const $ = prepare(raw.course.S1[3])

    expect(breakdown($)).toEqual(data.breakdown.S1[3])
  })
})

describe('info should get a course\'s info', () => {

  it('PR1 - Period 1', () => {
    const $ = prepare(raw.course.PR1[0])

    expect(info($)).toEqual(data.info.PR1[0])
  })

  it('PR1 - Period 3', () => {
    const $ = prepare(raw.course.PR1[2])

    expect(info($)).toEqual(data.info.PR1[2])
  })

  it('S1 - Period 1', () => {
    const $ = prepare(raw.course.S1[0])

    expect(info($)).toEqual(data.info.S1[0])
  })

  it('S1 - Period 6', () => {
    const $ = prepare(raw.course.S1[5])

    expect(info($)).toEqual(data.info.S1[5])
  })

})
