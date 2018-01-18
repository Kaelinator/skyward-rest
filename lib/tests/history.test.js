
const { data, raw } = require('./data/history.data.js')
const parse         = require('../parser')

describe('Parses history from 2013 to 2018', () => {

  it('Parses 2013', () => {
    const parsed = raw.reduce(parse.history, [])
    // expect(parsed).toEqual(data[0])
  })
})