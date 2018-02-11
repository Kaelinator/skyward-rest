
const { compose }   = require('../../lib/helpers').structures
const { jQueryify } = require('../../lib/helpers').preppers

const classify = require('../lib/classify')
const { raw }  = require('./report.data.js')

const prepare = compose(
  $ => $('tr')[0],
  jQueryify,
  html => `<table>${html}</table>`
)

describe('classify', () => {
  it('distinguishes between a lit, cat, and an assignment', () => {

    raw.assignment
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'assignment')
      })

    raw.lit
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'lit')
      })

    raw.cat
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'cat')
      })
  })

  it('distinguishes between a year and a course', () => {

    raw.year
      .map(prepare)
      .forEach(tr => {

        expect(classify.history(tr)).toHaveProperty('type', 'year')
      })

    raw.course
      .map(prepare)
      .forEach(tr => {

        expect(classify.history(tr)).toHaveProperty('type', 'course')
      })
  })

  it('identifies trs that match nothing', () => {
    
    raw.other
      .map(prepare)
      .forEach(tr => {

        expect(classify.history(tr)).toHaveProperty('type', 'other')
        expect(classify.course(tr)).toHaveProperty('type', 'other')
      })
  })
})