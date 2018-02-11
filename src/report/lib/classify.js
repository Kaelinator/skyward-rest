
const { objectify } = require('../../lib/helpers').modifiers
const { ensure }    = require('../../lib/helpers').traversers

const assignment = require('../../tr-types/assignment')
const lit        = require('../../tr-types/lit')
const cat        = require('../../tr-types/cat')
const course     = require('../../tr-types/course')
const year       = require('../../tr-types/year')

const assignmentOrOther = tr => ensure(tr)(4)()
  ? assignment(tr) 
  : objectify('other')({})

const litOrCat = tr => ensure(tr)(1)(0)(0)() 
  ? lit(tr) 
  : cat(tr)

const courseContext = tr => (tr.attribs.class === 'sf_Section cat')
  ? litOrCat(tr)
  : assignmentOrOther(tr)

const historyContext = tr => (tr.attribs.class === 'even')
  ? course(tr)
  : ensure(tr)(0)(0)(0)()
  ? year(tr)
  : objectify('other')({})

module.exports = {
  course: courseContext,
  history: historyContext
}