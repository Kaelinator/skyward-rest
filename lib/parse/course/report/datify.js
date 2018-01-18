
const assignment    = require('./datify/assignment')
const cat           = require('./datify/cat')
const { ensure }    = require('../../helpers')
const lit           = require('./datify/lit')
const { objectify } = require('./datify/helpers')

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