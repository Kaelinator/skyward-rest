
const { compose }   = require('../../lib/helpers').structures
const { jQueryify } = require('../../lib/helpers').preppers

const classify = require('./classify')
const raw      = require('./classify.data.js')

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

        expect(classify(tr)).toHaveProperty('type', 'assignment')
      })
  })

  it('identifies cats', () => {
    
    raw.lit
      .map(prepare)
      .forEach(tr => {

        expect(classify(tr)).toHaveProperty('type', 'lit')
      })
  })

  it('identifies lits', () => {
    
    raw.cat
      .map(prepare)
      .forEach(tr => {

        expect(classify(tr)).toHaveProperty('type', 'cat')
      })
  })

  it('identifies years', () => {

    raw.year
      .map(prepare)
      .forEach(tr => {

        expect(classify(tr)).toHaveProperty('type', 'year')
      })
  })

  it('identifies courses', () => {
    
    raw.course
      .map(prepare)
      .forEach(tr => {

        expect(classify(tr)).toHaveProperty('type', 'course')
      })
  })

  it('identifies trs that match nothing', () => {
    
    raw.other
      .map(prepare)
      .forEach(tr => {

        expect(classify(tr)).toHaveProperty('type', 'other')
        expect(classify(tr)).toHaveProperty('type', 'other')
      })
  })
})