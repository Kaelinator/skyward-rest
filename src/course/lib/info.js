
const { nums }    = require('../../lib/helpers').scrapers
const { ensure }    = require('../../lib/helpers').traversers
const { compose } = require('../../lib/helpers').structures

const grabLit = $ => ensure($('table[id*="stuTermSummaryGrid"]>thead>tr>th')[0], 0).get('data')
const trim = str => str.match(/\w+/)[0]
const getLit = compose(
  trim,
  grabLit
)
const formInfo = $ => {
  
  const header = $('h2.gb_heading')[0]

  return {
    lit: getLit($),
    course: ensure(header, 0, 0, 0).get('data'),
    period: ensure(header, 0, 2, 1, 0).get('data'),
    instructor: ensure(header, 0, 4, 0).get('data')
  }
}
  

module.exports = compose(
  nums,
  formInfo
)