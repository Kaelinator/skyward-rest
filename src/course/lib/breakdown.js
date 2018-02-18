
const { trimValues }   = require('../../lib/helpers').modifiers
const { nums }         = require('../../lib/helpers').scrapers
const { ensure } = require('../../lib/helpers').traversers
const { compose }      = require('../../lib/helpers').structures

const grabSummary = $ => $('td[class="nPtb"]').get()

const onlyParents = td => ensure(td, 0, 0).exists()

const formBreakdown = td => ({
  lit: ensure(td, 0, 0, 0).get('data'),
  grade: ensure(td, 1, 0).get('data'),
  percent: ensure(td, 2, 0).get('data')
})

const breakItDown = summary =>
  summary.filter(onlyParents)
    .map(formBreakdown)
    .map(trimValues(/\w+/))
    .map(nums)

const nullIfEmpty = breakdown => (breakdown.length > 0) ? breakdown : null

module.exports = compose(
  nullIfEmpty,
  breakItDown,
  grabSummary
)