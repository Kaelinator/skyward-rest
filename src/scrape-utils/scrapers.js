
const { ensure }             = require('../lib/helpers').traversers
const { compose }            = require('../lib/helpers').structures
const { mapObj, trimValues } = require('../lib/helpers').modifiers

const nums = obj => mapObj(obj, n => Number(n) || n)

const formScore = td => ({
  earned: td(0)('data'),
  total: td(2)('data')
})

const createScore = compose(
  nums,
  trimValues(/\w+|\*/),
  formScore
)

const getScore = td => ensure(td)(1)() 
  ? createScore(td) 
  : []

module.exports = {
  getScore,
  nums
}