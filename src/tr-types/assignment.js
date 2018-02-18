
const { mapObj, objectify } = require('../lib/helpers').modifiers
const { getScore }          = require('../lib/helpers').scrapers
const { compose }           = require('../lib/helpers').structures
const { ensure }      = require('../lib/helpers').traversers

const fixEmpties = meta => mapObj(meta, data => 
  (data === String.fromCharCode(160)) ? null : data
)

const formMeta = tr => ({
  missing: ensure(tr, 5, 0).get('data'),
  noCount: !ensure(tr, 6, 0).get('data'),
  absent: ensure(tr, 7, 0).get('data')
})

const getMeta = compose(
  fixEmpties,
  formMeta
)

const formAssignment = tr => ({
  assignments: {
    date: ensure(tr, 0, 0).get('data') ,
    title: ensure(tr, 1, 0, 0).get('data'),
    score: getScore(tr),
    meta: getMeta(tr)
  }
})

module.exports = compose(
  objectify('assignment'),
  formAssignment
)