
const data        = require('./data/history.data.js')
const { compose } = require('../../../helpers/sky-utils').structures
const prep        = require('../../prep')
const { raw }     = require('../../tests/parser.data.js')
const school      = require('../h-school')

const prepare = compose(
  prep.jQueryify,
  prep.cleanupQuotes,
  prep.cleanupLines
)

describe('Gets schools from 2018 to 2013', () => {

  it('Gets 2017-2018 school', () => {
    const $ = prepare(raw.history[0])

    expect(school($)).toEqual(data[0])
  })

  it('Gets 2016-2017 summer school', () => {
    const $ = prepare(raw.history[1])

    expect(school($)).toEqual(data[1])
  })

  it('Gets 2016-2017 school', () => {
    const $ = prepare(raw.history[2])

    expect(school($)).toEqual(data[2])
  })
  it('Gets 2015-2016 school', () => {
    const $ = prepare(raw.history[3])

    expect(school($)).toEqual(data[3])
  })
})