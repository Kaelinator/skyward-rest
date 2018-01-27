
const { objectify } = require('../../../../../helpers').modifiers
const { ensure }    = require('../../../../../helpers').traversers

const assignment = require('./types/assignment')
const cat        = require('./types/cat')
const lit        = require('./types/lit')

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