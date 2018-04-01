
const { objectify }  = require('../../lib/helpers').modifiers
const { ensure }     = require('../../lib/helpers').traversers
const { switchcase } = require('../../lib/helpers').structures

const assignment = require('../../tr-types/assignment')
const banner     = require('../../tr-types/banner')
const lit        = require('../../tr-types/lit')
const cat        = require('../../tr-types/cat')
const course     = require('../../tr-types/course')
const strip      = require('../../tr-types/strip')
const year       = require('../../tr-types/year')

const yearAttrs = { 
  style: 'font-weight:bold;line-height:1.3em; background-color:#FFFFFF',
  class: ''
}

const bannerAttrs = {
  style: 'font-weight:bold;line-height:1.3em; background-color:#EAEEF4',
  class: ''
}

const bannerTdAttrs = {
  style: 'white-space:nowrap;vertical-align:bottom'
}

const allContext = tr =>
  ensure(tr, 1, 0).attrsMatch({ id: 'showAssignmentInfo' })
  ? assignment(tr)
  : ensure(tr).attrsMatch({ class: 'sf_Section cat' }) && ensure(tr, 1, 0, 0).exists()
  ? lit(tr)
  : ensure(tr).attrsMatch({ class: 'sf_Section cat' }) && !ensure(tr, 1, 0, 0).exists()
  ? cat(tr)
  : ensure(tr).attrsMatch({ class: 'even'}) && ensure(tr, 0).attrsMatch({ scope: 'row' })
  ? course(tr)
  : ensure(tr).attrsMatch({ class: 'even' })
  ? strip(tr)
  : ensure(tr).attrsMatch(yearAttrs) && ensure(tr, 0, 0, 0).exists()
  ? year(tr)
  : ensure(tr).attrsMatch(bannerAttrs) && ensure(tr, 0).attrsMatch(bannerTdAttrs)
  ? banner(tr)
  : objectify('other')({})

module.exports = allContext