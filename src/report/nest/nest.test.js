
const nest = require('./nest')

describe('nest', () => {

  it('keeps cats independent', () => {
    
    const arr = [
      { type: 'cat', data: '1st' },
      { type: 'cat', data: '2nd' },
      { type: 'cat', data: '3rd' },
      { type: 'cat', data: '4th' }
    ]

    expect(nest(arr).length).toBe(arr.length)
  })

  it('merges contents of assignments into cats', () => {

    const arr = [
      { type: 'cat', data: { a: [], id: 1 } },
      { type: 'assignment', data: { a: '1st' } },
      { type: 'assignment', data: { a: '2nd' } },
      { type: 'assignment', data: { a: '3rd' } },
      { type: 'cat', data: { a: [], id: 10 } },
      { type: 'assignment', data: { a: '10th' } },
      { type: 'assignment', data: { a: '20th' } },
      { type: 'assignment', data: { a: '30th' } }
    ]

    expect(nest(arr)).toEqual([
      { a: [ '1st', '2nd', '3rd' ], id: 1 },
      { a: [ '10th', '20th', '30th' ], id: 10 }
    ])
  })

  it('merges contents of lits into cats', () => {

    const arr = [
      { type: 'cat', data: { a: [], id: 1 } },
      { type: 'lit', data: { a: '1st' } },
      { type: 'lit', data: { a: '2nd' } },
      { type: 'lit', data: { a: '3rd' } },
      { type: 'cat', data: { a: [], id: 10 } },
      { type: 'lit', data: { a: '10th' } },
      { type: 'lit', data: { a: '20th' } },
      { type: 'lit', data: { a: '30th' } }
    ]

    expect(nest(arr)).toEqual([
      { a: [ '1st', '2nd', '3rd' ], id: 1 },
      { a: [ '10th', '20th', '30th' ], id: 10 }
    ])
  })

  it('disregards unmergeable data when merging assignments/lits into cats', () => {

    const arr = [
      { type: 'cat', data: { a: [] } },
      { type: 'assignment', data: { unmergeable: '1st' } },
      { type: 'lit', data: { uhOh: '2nd' } },
      { type: 'assignment', data: { woops: '3rd' } }
    ]
    
    expect(nest(arr)).toEqual([{ a: [] }])
  })

  it('disregards other data', () => {
    
    const arr = [
      { type: 'cat', data: '1st' },
      { type: 'other', data: 0 },
      { type: 'other', data: 1 }
    ]

    expect(nest(arr)).toEqual([ '1st' ])
  })
})