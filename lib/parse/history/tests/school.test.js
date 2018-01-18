
const { data, raw } = require('../../../tests/data/history.data.js')
const school = require('../school')
const prepare = require('../../prepare')

describe('Gets schools from 2018 to 2013', () => {

  it('Gets 2018 school', () => {
    const $ = prepare.history(raw[0])

    expect(school($)).toEqual(data[0])
  })
})