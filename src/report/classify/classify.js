
const { objectify }  = require('../../lib/helpers').modifiers
const { ensure }     = require('../../lib/helpers').traversers
const { switchcase } = require('../../lib/helpers').structures

const assignment = require('../../tr-types/assignment')
const lit        = require('../../tr-types/lit')
const cat        = require('../../tr-types/cat')
const course     = require('../../tr-types/course')
const year       = require('../../tr-types/year')

const yearAttrs = { 
  style: 'font-weight:bold;line-height:1.3em; background-color:#FFFFFF',
  class: ''
}

const allContext = tr =>
  ensure(tr, 1, 0).attrsMatch({ id: 'showAssignmentInfo' })
  ? assignment(tr)
  : ensure(tr).attrsMatch({ class: 'sf_Section cat' }) && ensure(tr, 1, 0, 0).exists()
  ? lit(tr)
  : ensure(tr).attrsMatch({ class: 'sf_Section cat' }) && !ensure(tr, 1, 0, 0).exists()
  ? cat(tr)
  : ensure(tr).attrsMatch({ class: 'even' })
  ? course(tr)
  : ensure(tr).attrsMatch(yearAttrs)
  ? year(tr)
  : objectify('other')({})

module.exports = allContext