
const { data, raw } = require('../../../tests/data/history.data.js')
const school = require('../school')
const prepare = require('../../prepare')

describe('Gets schools from 2018 to 2013', () => {

  it('Gets 2017-2018 school', () => {
    const $ = prepare.history(raw[0])

    expect(school($)).toEqual(data[0])
  })

  it('Gets 2016-2017 summer school', () => {
    const $ = prepare.history(raw[1])

    expect(school($)).toEqual(data[1])
  })

  it('Gets 2016-2017 school', () => {
    const $ = prepare.history(raw[2])

    expect(school($)).toEqual(data[2])
  })
  it('Gets 2015-2016 school', () => {
    const $ = prepare.history(raw[3])

    expect(school($)).toEqual(data[3])
  })
})