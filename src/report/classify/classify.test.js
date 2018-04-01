
const { compose }   = require('../../lib/helpers').structures
const { jQueryify } = require('../../lib/helpers').preppers

const classify = require('./classify')
const { raw }  = require('../../tr-types/tr.data.js')

const prepare = compose(
  $ => $('tr')[0],
  jQueryify,
  html => `<table>${html}</table>`
)

const test = type => tr => {
  
  expect(classify(tr)).toHaveProperty('type', type)
}

describe('classify', () => {

  it('identifies assignments', () => {

    raw.assignment
      .map(prepare)
      .forEach(test('assignment'))
  })

  it('identifies banners', () => {

    raw.banner
      .map(prepare)
      .forEach(test('banner'))
  })

  it('identifies cats', () => {
    
    raw.lit
      .map(prepare)
      .forEach(test('lit'))
  })

  it('identifies lits', () => {
    
    raw.cat
      .map(prepare)
      .forEach(test('cat'))
  })

  it('identifies strips', () => {

    raw.strip
      .map(prepare)
      .forEach(test('strip'))
  })

  it('identifies years', () => {

    raw.year
      .map(prepare)
      .forEach(test('year'))
  })

  it('identifies courses', () => {
    
    raw.course
      .map(prepare)
      .forEach(test('course'))
  })

  it('identifies trs that match nothing', () => {
    
    raw.other
      .map(prepare)
      .forEach(test('other'))
  })
})