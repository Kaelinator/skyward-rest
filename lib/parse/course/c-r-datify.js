
const { trimValues, objectify } = require('../../helpers/sky-utils').modifiers
const { ensure }                = require('../../helpers/sky-utils').traversers

const assignment = require('./c-r-d-assignment')
const cat        = require('./c-r-d-cat')
const lit        = require('./c-r-d-lit')

const assignmentOrEmpty = tr => ensure(tr)(4)() 
  ? assignment(tr) 
  : objectify('empty')({})

const litOrCat = tr => ensure(tr)(1)(0)(0)() 
  ? lit(tr) 
  : cat(tr)

const contextify = tr => (tr.attribs.class === 'sf_Section cat') 
    ? litOrCat(tr) 
    : assignmentOrEmpty(tr)

module.exports = trs => trs.map(contextify)