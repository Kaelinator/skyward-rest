
const { data, raw } = require('./parser.data.js')

const course  = require('../../course')
// const history = require('../history')

describe('Parses entire `lit`s', () => {

  it('Parses PR1', () => {
    const parsed = raw.course.PR1.reduce(course, [])
    
    expect(data.course.PR1).toEqual(parsed)
  })

  it('Parses PR2', () => {
    const parsed = raw.course.PR2.reduce(course, [])

    expect(data.course.PR2).toEqual(parsed)
  })

  it('Parses Q1', () => {
    const parsed = raw.course.Q1.reduce(course, [])

    expect(data.course.Q1).toEqual(parsed)
  })

  it('Parses PR4', () => {
    const parsed = raw.course.PR4.reduce(course, [])

    expect(data.course.PR4).toEqual(parsed)
  })

  it('Parses S1', () => {
    const parsed = raw.course.S1.reduce(course, [])
    
    expect(data.course.S1).toEqual(parsed)
  })
})