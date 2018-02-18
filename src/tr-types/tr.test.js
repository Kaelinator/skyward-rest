
const prep        = require('../data-utils/preppers')
const { compose } = require('../data-utils/structures')

const { raw, data } = require('./tr.data.js')

const assignment = require('./assignment')
const cat        = require('./cat')
const course     = require('./course')
const lit        = require('./lit')
const year       = require('./year')

const prepare = compose(
  $ => $('tr').get(0),
  prep.cheerioify,
  html => `<table>${html}</table>`
)

const test = type => (parsed, i) => {

  expect(parsed.data).toEqual(data[type][i])
}

describe('assignment', () => {

  it('captures date, score, title, and meta data', () => {
    
    raw.assignment
      .map(prepare)
      .map(assignment)
      .forEach(test('assignment'))
  })

  it('places null values & does not throw errors', () => {

    const parsed = assignment(0)

    expect(parsed.data).toEqual({
      assignments: {
        date: null,
        meta: { absent: null, missing: null, noCount: true },
        score: [],
        title: null
      }
    })
  })
})

describe('cat', () => {

  it('captures/placeholds category, score, and weight data', () => {

    raw.cat
      .map(prepare)
      .map(cat)
      .forEach(test('cat'))
  })

  it('places null values & does not throw errors', () => {

    const parsed = cat(0)
    
    expect(parsed.data).toEqual({
      assignments: [], 
      category: null, 
      score: [], 
      weight: []
    })
  })
})

describe('course', () => {

  // it('captures data', () => {

  //   raw.course
  //     .map(prepare)
  //     .map(course)
  //     .forEach(test('course'))
  // })

  // it('places null values & does not throw errors', () => {

  //   const parsed = course(0)
    
  //   expect(parsed.data).toEqual({})
  // })
})

describe('lit', () => {

  it('captures score and weight data', () => {

    raw.lit
      .map(prepare)
      .map(lit)
      .forEach(test('lit'))
  })

  it('places null values & does not throw errors', () => {

    const parsed = lit(0)
    
    expect(parsed.data).toEqual({
      score: { lit: null }, 
      weight: { lit: null }
    })
  })
})

describe('year', () => {

  it('captures data', () => {

    raw.year
      .map(prepare)
      .map(year)
      .forEach(test('year'))
  })
})