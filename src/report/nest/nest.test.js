
const nest = require('./nest')
const { data } = require('../../tr-types/tr.data.js')

describe('nest', () => {

  it('keeps cats & banners independent', () => {
    
    const cats = [
      { type: 'cat', data: '1st' },
      { type: 'cat', data: '2nd' },
      { type: 'cat', data: '3rd' },
      { type: 'cat', data: '4th' }
    ]

    expect(nest(cats).length).toBe(cats.length)

    const banners = [
      { type: 'banner', data: { lits: [ '1:1', '1:2' ] } },
      { type: 'banner', data: { lits: [ '2:1', '2:2' ] } },
      { type: 'banner', data: { lits: [ '3:1', '3:2' ] } },
      { type: 'banner', data: { lits: [ '4:1', '4:2' ] } }
    ]

    expect(nest(banners).length).toBe(banners.length)
  })

  it('merges contents of assignments into cats & strips into banners', () => {

    const assignments = [
      { type: 'cat', data: { a: [], id: 1 } },
      { type: 'assignment', data: { a: '1st' } },
      { type: 'assignment', data: { a: '2nd' } },
      { type: 'assignment', data: { a: '3rd' } },
      { type: 'cat', data: { a: [], id: 10 } },
      { type: 'assignment', data: { a: '10th' } },
      { type: 'assignment', data: { a: '20th' } },
      { type: 'assignment', data: { a: '30th' } }
    ]

    expect(nest(assignments)).toEqual([
      { a: [ '1st', '2nd', '3rd' ], id: 1 },
      { a: [ '10th', '20th', '30th' ], id: 10 }
    ])

    const strips = [
      { type: 'banner', data: { lits: [ { a: [] }, { a: [] } ] } },
      { type: 'strip', data: { lits: [ { a: '1:1' }, { a: '1:2' } ] } },
      { type: 'strip', data: { lits: [ { a: '2:1' }, { a: '2:2' } ] } },
      { type: 'strip', data: { lits: [ { a: '3:1' }, { a: '3:2' } ] } },
      { type: 'banner', data: { lits: [ { a: [] }, { a: [] } ] } },
      { type: 'strip', data: { lits: [ { a: '10:1' }, { a: '10:2' } ] } },
      { type: 'strip', data: { lits: [ { a: '20:1' }, { a: '20:2' } ] } },
      { type: 'strip', data: { lits: [ { a: '30:1' }, { a: '30:2' } ] } },
    ]

    expect(nest(strips)).toEqual([
      { lits: [ { a: [ '1:1', '2:1', '3:1' ] }, { a: [ '1:2', '2:2', '3:2' ] } ] },
      { lits: [ { a: [ '10:1', '20:1', '30:1' ] }, { a: [ '10:2', '20:2', '30:2' ] } ] },
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