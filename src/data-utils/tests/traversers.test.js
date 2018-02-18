
const { ensure } = require('../traversers')
const cheerio = require('cheerio')

const td = cheerio.load('<table><td><div>Here I am!</div></td></table>')('td').get(0)

describe('ensure', () => {

  it('`.exists` returns false when specified selector doesn\'t exist', () => {
    
    expect(ensure(td, 1, 10).exists()).toBeFalsy()
  })

  it('`.exists` returns true when specified selector does exist', () => {
    
    expect(ensure(td, 0, 0).exists()).toBeTruthy()
  })

  it('`.get` returns entire div', () => {

    expect(ensure(td, 0, 0).get()).toHaveProperty('data', 'Here I am!')
  })

  it('`.get("data")` returns data from div', () => {

    expect(ensure(td, 0, 0).get('data')).toBe('Here I am!')
  })

  it('`.get()` for a non-existent element returns null', () => {

    expect(ensure(td, 0, 10).get('data')).toBeNull()
  })

  it('`.get()` with a non-existent property returns null', () => {

    expect(ensure(td, 0, 0).get('arbitrary-attribute-that-does-not-exist')).toBeNull()
  })

})
