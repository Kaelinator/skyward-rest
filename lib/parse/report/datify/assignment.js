
const { compose, mapObj }     = require('../../../helpers')
const { ensure, grab }        = require('../../helpers')
const { getScore, objectify } = require('./helpers')

const fixEmpties = meta => mapObj(meta, data => 
  (data === String.fromCharCode(160)) ? null : data
)

const formMeta = tr => ({
  missing: grab(tr)(5)(0)('data'),
  noCount: !ensure(tr)(6)(0)('data'),
  absent: grab(tr)(7)(0)('data')
})

const getMeta = compose(
  fixEmpties,
  formMeta
)

const getDate = tr => ensure(tr)(0)(0)() 
  ? grab(tr)(0)(0)('data') 
  : null

const getTitle = tr => ensure(tr)(1)(0)(0)() 
  ? grab(tr)(1)(0)(0)('data') 
  : null

const formAssignment = tr => ({
  assignments: {
    date: getDate(tr),
    title: getTitle(tr),
    score: getScore(grab(tr)(4)),
    meta: getMeta(tr)
  }
})

module.exports = compose(
  objectify('assignment'),
  formAssignment
)