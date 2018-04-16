
const {
  stripData,
  insertData,
  objectInsert,
  nestData,
  nestArray,
  labelArray,
  insertAndPair
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
    ).toEqual([ 'boop', [ 'array' ] ])

    expect(
      insertData(a)({ b: 0, data: { a: [ {} ], b: {} } })
    ).toEqual([ 'boop', { a: [ {} ], b: {} } ])
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

describe('nestArray', () => {

  it('inserts the current array into the previous array', () => {

    expect(
      nestArray([ { x: 1 }, [ [ 'x', 'y' ] ] ])({ data: [ '1', '2' ] })
    ).toEqual([ { x: 1 }, [ [ 'x', 'y'], [ '1', '2' ] ] ])
  })
})

// describe('insertAndPair', () => {

//   it('given an array and key then an object, assigns the first'
//   + ' element in the array to the object with the given key', () => {

//     const data = [{
//       vals: [
//         { x: [], y: 'hello'},
//         { x: [], y: 'hey'}
//       ]
//     }]

//     expect(
//       insertAndPair([['omit', 1, 2]], 'vals', 'x')(data)
//     ).toEqual([ { vals: [
//       { x: 1, y: 'hello' },
//       { x: 2, y: 'hey' }
//     ] } ])
//   })
// })

describe('labelArray', () => {

  const labeled = [[
    ['a', 'b', 'c'],
    [
      { 'a': 1 },
      { 'b': 2 },
      { 'c': 3 }
    ]
  ]]

  it('given array a, then datafied array b, returns an array of'
  + ' objects, all with a key from a and a value from b, in respect'
  + ' to the element\'s index', () => {

    expect(
      labelArray([[['a', 'b', 'c']]])({ data: [1, 2, 3]})
    ).toEqual(labeled)
  })

  it('handles multiple value arrays', () => {
    
    expect(
      labelArray(labeled)({ data: [4, 5, 6]})
    ).toEqual([[
      ['a', 'b', 'c'],
      [
        { 'a': 1 },
        { 'b': 2 },
        { 'c': 3 }
      ],
      [
        { 'a': 4 },
        { 'b': 5 },
        { 'c': 6 }
      ]
    ]])
  })
})
