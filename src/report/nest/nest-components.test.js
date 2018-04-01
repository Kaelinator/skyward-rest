
const {
  stripData,
  insertData,
  objectAssign,
  objectInsert,
  nestData,
  mapObjectArray,
  arrayObjectInsert,
  nestDataArray
} = require('./nest-components')

describe('stripData', () => {
  
  it('returns only the contents of the data property', () => {
    
    expect(
      stripData({ type: 'flag', data: 1 })
    ).toBe(1)

    expect(
      stripData({ type: 'year', data: [] })
    ).toEqual([])

    expect(
      stripData({ type: 'date', data: 'Judy' })
    ).toBe('Judy')

    expect(
      stripData({ type: 'text', data: { boop: 'bop' } })
    ).toEqual({ boop: 'bop' })
  })
  
  it('returns undefined if data property is absent', () => {
    
    expect(
      stripData({})
    ).toBeUndefined()
  })
})

describe('insertData', () => {

  it('given an array then an object, returns a new array with'
  + ' the data from the object appended to the original array values', () => {

    const a = [ 'boop' ]

    expect(
      insertData(a)({ type: 'cat', data: '2nd element' })
    ).toEqual([ 'boop', '2nd element' ])

    expect(
      insertData(a)({ z: 'a', data: [ 'array' ] })
    ).toEqual([ 'boop', 'array' ])

    expect(
      insertData(a)({ b: 0, data: { a: [ {} ], b: {} } })
    ).toEqual([ 'boop', { a: [ {} ], b: {} } ])
  })
})

describe('objectAssign', () => {

  it('curried version of `Object.assign`', () => {

    expect(
      objectAssign({ id: '#' })({ a: 1 })
    ).toEqual({ id: '#', a: 1 })
  })
})

describe('objectInsert', () => {

  it('given an object then another object, it places the contents'
  + ' of the second object into designated arrays in the first object', () => {

    expect(
      objectInsert({ a: [ '1st' ] })({ a: '2nd' })
    ).toEqual({ a: [ '1st', '2nd' ] })

    expect(
      objectInsert({ a: [ '1st' ], b: [] })({ a: '2nd' })
    ).toEqual({ a: [ '1st', '2nd' ], b: [] })

    expect(
      objectInsert({ a: [ 'a1st' ], b: [ 'b1st' ] })({ a: 'a2nd', b: 'b2nd' })
    ).toEqual({ a: [ 'a1st', 'a2nd' ], b: [ 'b1st', 'b2nd' ] })
  })

  it('disregards extraneous data from the second object', () => {
    
    expect(
      objectInsert({ a: [ 'hi' ] })({ a: 'there', b: 'disregarded' })
    ).toEqual({ a: [ 'hi', 'there' ] })
  })

  it('forces values from first object into an array if it is not'
  + ' already an array', () => {

    expect(
      objectInsert({ a: 'not an array' })({ a: 'oops' })
    ).toEqual({ a: [ 'not an array', 'oops' ] })

    expect(
      objectInsert({ a: 0, b: 0 })({ a: 'yikes' })
    ).toEqual({ a: [ 0, 'yikes' ], b: 0 })

    expect(
      objectInsert({ a: null })({ a: 'carrots' })
    ).toEqual({ a: [ 'carrots' ] })
  })
})

describe('nestData', () => {

  it('given an array then an object, uses `stripData` then'
  + ' `objectInsert` on the last element in the array, returning'
  + ' a new array', () => {

    expect(
      nestData([ { x: 0 }, { a: '1st' } ])({ data: { a: '2nd' } })
    ).toEqual([ { x: 0 }, { a: [ '1st', '2nd' ] } ])
  })
})

describe('mapObjectArray', () => {
  
  it('given an array of objects then another array of objects,'
  + ' uses `objectInsert` on each object in the first array to its'
  + ' corresponding indexed object of the second array', () => {

    const parent = [ { a: [ '1st a' ] }, { a: [ '2nd a' ] } ]
    const child = [ { a: '1st b' }, { a: '2nd b' } ]

    expect(
      mapObjectArray(parent)(child)
    ).toEqual([ { a: [ '1st a', '1st b' ] }, { a: [ '2nd a', '2nd b' ] } ])
  })
})

describe('arrayObjectInsert', () => {

  it('given an object then another object, uses `mapObjectArray`'
  + ' on each property', () => {

    const parent = {
      stuff: [ { a: [ '1st a' ] }, { a: [ '2nd a' ] } ]
    }

    const child = {
      stuff: [ { a: '1st b' }, { a: '2nd b' } ]
    }

    expect(
      arrayObjectInsert(parent)(child)
    ).toEqual({
      stuff: [
        { a: [ '1st a', '1st b' ] },
        { a: [ '2nd a', '2nd b' ] }
      ]
    })
  })
})

describe('nestDataArray', () => {

  it('given an array of objects then an object, uses `arrayObjectInsert`'
  + ' on the last object of the array, returning a new array', () => {

    const a = [
      { x: 'untouched' },
      {
        stuff: [ { a: [ '1st a' ] }, { a: [ '2nd a' ] } ]
      }
    ]

    const child = {
      data: {
        stuff: [ { a: '1st b' }, { a: '2nd b' } ]
      }
    }

    expect(
      nestDataArray(a)(child)
    ).toEqual([
      { x: 'untouched'},
      { 
        stuff: [
          { a: [ '1st a', '1st b' ] },
          { a: [ '2nd a', '2nd b' ] }
        ]
      }
    ])
  })
})