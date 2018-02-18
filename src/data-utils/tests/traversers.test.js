
const { ensure } = require('../traversers')
const cheerio = require('cheerio')

const td = cheerio.load('<table><td><div class="slide" id="my-div">Here I am!</div></td></table>')('td').get(0)

describe('ensure.exists', () => {

  it('returns false when specified selector doesn\'t exist', () => {
    
    expect(ensure(td, 1, 10).exists()).toBeFalsy()
    expect(ensure(td, 'what?', 10).exists()).toBeFalsy()
  })

  it('returns true when specified selector does exist', () => {
    
    expect(ensure(td, 0).exists()).toBeTruthy()
    expect(ensure(td, 0, 0).exists()).toBeTruthy()
  })

})

describe('ensure.get', () => {
  
  it('returns entire div', () => {

    expect(ensure(td, 0, 0).get()).toHaveProperty('data', 'Here I am!')
  })

  it('returns data from div passed "data"', () => {

    expect(ensure(td, 0, 0).get('data')).toBe('Here I am!')
  })

  it('returns null for a non-existent element', () => {

    expect(ensure(td, 0, 10).get('data')).toBeNull()
  })

  it('returns null passed a non-existent property', () => {

    expect(ensure(td, 0, 0).get('arbitrary-attribute-that-does-not-exist')).toBeNull()
  })
})

describe('ensure.attrsMatch', () => {

  it('returns false passed anything other than object', () => {

    expect(ensure(td).attrsMatch()).toBeFalsy()
    expect(ensure(td).attrsMatch('woopsies')).toBeFalsy()
    expect(ensure(td).attrsMatch(42)).toBeFalsy()
  })

  it('returns true passed correct attributes', () => {

    expect(ensure(td, 0, 0).attrsMatch({ class: 'slide' })).toBeTruthy()
    expect(ensure(td, 0, 0).attrsMatch({ class: 'slide', id: 'my-div' })).toBeTruthy()
  })

  it('returns false passed incorrect attribute', () => {
    
    expect(ensure(td, 0, 0).attrsMatch({ class: 'not-a-slide' })).toBeFalsy()
    expect(ensure(td, 0, 0).attrsMatch({ class: 'not-a-slide', id: 'not-my-div' })).toBeFalsy()
  })

  it('returns false for a non-existent element', () => {

    expect(ensure(td, 10, 110).attrsMatch({ class: 'slide' })).toBeFalsy()
  })
})