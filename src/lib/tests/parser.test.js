
const { data, raw } = require('./parser.data.js')

const course  = require('../../course')
// const history = require('../history')

describe('parser', () => {

  it('Parses PR1', () => {
    const parsed = raw.course.PR1.reduce(course, [])
    
    expect(parsed).toEqual(data.course.PR1)
  })

  it('Parses PR2', () => {
    const parsed = raw.course.PR2.reduce(course, [])

    expect(parsed).toEqual(data.course.PR2)
  })

  it('Parses Q1', () => {
    const parsed = raw.course.Q1.reduce(course, [])

    expect(parsed).toEqual(data.course.Q1)
  })

  it('Parses PR4', () => {
    const parsed = raw.course.PR4.reduce(course, [])

    expect(parsed).toEqual(data.course.PR4)
  })

  it('Parses S1', () => {
    const parsed = raw.course.S1.reduce(course, [])
    
    expect(parsed).toEqual(data.course.S1)
  })
})