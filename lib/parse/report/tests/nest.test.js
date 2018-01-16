
const { data, raw } = require('./data/nest.data.js')
const nest          = require('../nest')

describe('Should take objects from datify and nest them properly', () => {

  it('PR1 - One assignment, one category',
    () => expect(nest(raw.PR1[0])).toEqual(data.PR1[0])
  )

  it('PR1 - Two categories, one with no assignments',
    () => expect(nest(raw.PR1[1])).toEqual(data.PR1[1])
  )

  it('PR1 - Two categories with assignments',
    () => expect(nest(raw.PR1[2])).toEqual(data.PR1[2])
  )

  it('S1 - One category no exam', 
    () => expect(nest(raw.S1[0])).toEqual(data.S1[0])
  )

  it('S1 - Two categories with exam', 
    () => expect(nest(raw.S1[4])).toEqual(data.S1[4])
  )
})
