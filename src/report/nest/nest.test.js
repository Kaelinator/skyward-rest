
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
      { type: 'banner', data: '1st' },
      { type: 'banner', data: '2nd' },
      { type: 'banner', data: '3rd' },
      { type: 'banner', data: '4th' }
    ]

    expect(nest(banners).length).toBe(banners.length)
  })

  it('merges strips into banners, creating a 2D array', () => {
    
    const a = [
      { type: 'banner', data: [['PR1', 'PR2', 'PR3', 'PR4']] },
      { type: 'strip', data: [100, 101, 102, 103] },
      { type: 'strip', data: [110, 111, 112, 113] },
      { type: 'strip', data: [120, 121, 122, 123] },
      { type: 'banner', data: [['PR1', 'PR2', 'PR3', 'PR4']] },
      { type: 'strip', data: [200, 201, 202, 203] },
      { type: 'strip', data: [210, 211, 212, 213] },
      { type: 'strip', data: [220, 221, 222, 223] }
    ]

    expect(nest(a)).toEqual([
      [
        ['PR1', 'PR2', 'PR3', 'PR4'],
        [100, 101, 102, 103],
        [110, 111, 112, 113],
        [120, 121, 122, 123]
      ],
      [
        ['PR1', 'PR2', 'PR3', 'PR4'],
        [200, 201, 202, 203],
        [210, 211, 212, 213],
        [220, 221, 222, 223]
      ]
    ])

  })

  it('merges contents of assignments into cats & strips into banners', () => {

    const a = [
      { type: 'cat', data: { a: [], id: 1 } },
      { type: 'assignment', data: { a: '1st' } },
      { type: 'assignment', data: { a: '2nd' } },
      { type: 'assignment', data: { a: '3rd' } },
      { type: 'cat', data: { a: [], id: 10 } },
      { type: 'assignment', data: { a: '10th' } },
      { type: 'assignment', data: { a: '20th' } },
      { type: 'assignment', data: { a: '30th' } }
    ]

    expect(nest(a)).toEqual([
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