
const cheerio     = require('cheerio')
const { compose } = require('../../../helpers')
const datify      = require('../datify')
const data        = require('./data/datify.data.js')
const prepare     = require('../../prepare')
const raw         = require('../../../../tests/data/course.data.js')

const testPrep = compose(
  $ => $('table[id*="stuAssignmentSummaryGrid"]>tbody>tr').get(),
  prepare
)

describe('Should form a coherent object from trs', () => {

  it('PR1 - One assignment, one category', () => {
    const trs = testPrep(raw.PR1[0])
    
    expect(datify(trs)).toEqual(data.PR1[0])
  })

  it('PR1 - Two categories, one with no assignments', () => {
    const trs = testPrep(raw.PR1[1])
    
    expect(datify(trs)).toEqual(data.PR1[1])
  })

  it('PR1 - Two categories with assignments', () => {
    const trs = testPrep(raw.PR1[2])

    expect(datify(trs)).toEqual(data.PR1[2])
  })

  it('PR3 - Three categories with some dropped assignments', () => {
    const trs = testPrep(raw.PR2[3])

    expect(datify(trs)).toEqual(data.PR2[3])
  })

  it('PR4 - Two categories with some unscored assignments', () => {
    const trs = testPrep(raw.PR4[6])

    expect(datify(trs)).toEqual(data.PR4[6])
  })

  it('S1 - One category no exam', () => {
    const trs = testPrep(raw.S1[0])

    expect(datify(trs)).toEqual(data.S1[0])
  })

  it('S1 - Two categories with exam', () => {
    const trs = testPrep(raw.S1[4])

    expect(datify(trs)).toEqual(data.S1[4])
  })
})