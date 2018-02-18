
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

  it('identifies assignments', () => {

    raw.assignment
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'assignment')
      })
  })

  it('identifies cats', () => {
    
    raw.lit
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'lit')
      })
  })

  it('identifies lits', () => {
    
    raw.cat
      .map(prepare)
      .forEach(tr => {

        expect(classify.course(tr)).toHaveProperty('type', 'cat')
      })
  })

  it('identifies years', () => {

    raw.year
      .map(prepare)
      .forEach(tr => {

        expect(classify.history(tr)).toHaveProperty('type', 'year')
      })
  })

  it('identifies courses', () => {
    
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