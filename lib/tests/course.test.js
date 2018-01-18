
const { data, raw } = require('./data/course.data.js')
const parse         = require('../parser')
const fs            = require('fs')

const save = data => {

	const contents = (data) => `module.exports = ${JSON.stringify(data)}`
	const path = (f) => `lib/tests/data/tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

describe('Parses from PR1 to S1', () => {

  it('Parses PR1', () => {
    const parsed = raw.PR1.reduce(parse.course, [])
    
    expect(data.PR1).toEqual(parsed)
  })

  it('Parses PR2', () => {
    const parsed = raw.PR2.reduce(parse.course, [])
    
    expect(data.PR2).toEqual(parsed)
  })

  it('Parses Q1', () => {
    const parsed = raw.Q1.reduce(parse.course, [])
    
    expect(data.Q1).toEqual(parsed)
  })

  it('Parses PR3', () => {
    const parsed = raw.PR3.reduce(parse.course, [])
    
    expect(data.PR3).toEqual(parsed)
  })

  it('Parses PR4', () => {
    const parsed = raw.PR4.reduce(parse.course, [])
    
    expect(data.PR4).toEqual(parsed)
  })

  it('Parses Q2', () => {
    const parsed = raw.Q2.reduce(parse.course, [])
    
    expect(data.Q2).toEqual(parsed)
  })

  it('Parses S1', () => {
    const parsed = raw.S1.reduce(parse.course, [])
    
    expect(data.S1).toEqual(parsed)
  })
})