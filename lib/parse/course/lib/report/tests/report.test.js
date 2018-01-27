
const { compose } = require('../../../../../helpers').structures
const data        = require('./report.data.js')
const datify      = require('../datify')
const nest        = require('../nest')
const prep        = require('../../../../prep')
const { raw }     = require('../../../../tests/parser.data.js')

const prepare = compose(
  $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get(),
  prep.jQueryify,
  prep.grabOutput,
  prep.cheerioify,
  prep.cleanupQuotes,
  prep.cleanupLines
)

describe('datify should form a coherent object from trs', () => {

  it('PR1 - One assignment, one category', () => {
    const trs = prepare(raw.course.PR1[0])
    
    expect(datify(trs)).toEqual(data.datify.PR1[0])
  })

  it('PR1 - Two categories, one with no assignments', () => {
    const trs = prepare(raw.course.PR1[1])
    
    expect(datify(trs)).toEqual(data.datify.PR1[1])
  })

  it('PR1 - Two categories with assignments', () => {
    const trs = prepare(raw.course.PR1[2])

    expect(datify(trs)).toEqual(data.datify.PR1[2])
  })

  it('PR3 - Three categories with some dropped assignments', () => {
    const trs = prepare(raw.course.PR2[0])

    expect(datify(trs)).toEqual(data.datify.PR2[0])
  })

  it('PR4 - Two categories with some unscored assignments', () => {
    const trs = prepare(raw.course.PR4[0])

    expect(datify(trs)).toEqual(data.datify.PR4[0])
  })

  it('S1 - One category no exam', () => {
    const trs = prepare(raw.course.S1[0])

    expect(datify(trs)).toEqual(data.datify.S1[0])
  })

  it('S1 - Two categories with exam', () => {
    const trs = prepare(raw.course.S1[4])

    expect(datify(trs)).toEqual(data.datify.S1[4])
  })
})

describe('nest should take objects from datify and nest them properly', () => {

  it('PR1 - One assignment, one category',
    () => expect(nest(data.datify.PR1[0])).toEqual(data.nest.PR1[0])
  )

  it('PR1 - Two categories, one with no assignments',
    () => expect(nest(data.datify.PR1[1])).toEqual(data.nest.PR1[1])
  )

  it('PR1 - Two categories with assignments',
    () => expect(nest(data.datify.PR1[2])).toEqual(data.nest.PR1[2])
  )

  it('S1 - One category no exam', 
    () => expect(nest(data.datify.S1[0])).toEqual(data.nest.S1[0])
  )

  it('S1 - Two categories with exam', 
    () => expect(nest(data.datify.S1[4])).toEqual(data.nest.S1[4])
  )
})