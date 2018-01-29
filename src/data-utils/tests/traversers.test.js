
const { ensure, grab } = require('../traversers')
const cheerio = require('cheerio')

const td = cheerio.load('<table><td><div>Here I am!</div></td></table>')('td').get(0)

describe('ensure should safely probe an element', () => {

  it('returns false when specified selector doesn\'t exist', () => {
    
    expect(ensure(td)(1)(10)()).toBeFalsy()
  })

  it('returns true when specified selector does exist', () => {
    
    expect(ensure(td)(0)(0)()).toBeTruthy()
  })

})

describe('grab should get specified data', () => {

  it('returns text from div', () => {

    expect(grab(td)(0)(0)('data')).toBe('Here I am!')
  })
})