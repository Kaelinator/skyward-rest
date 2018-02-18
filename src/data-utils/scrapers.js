
const { ensure }             = require('./traversers')
const { compose }            = require('./structures')
const { mapObj, trimValues } = require('./modifiers')

const nums = obj => mapObj(obj, n => Number(n) || n)

const formScore = td => ({
  earned: ensure(td, 4, 0).get('data'),
  total: ensure(td, 4, 2).get('data')
})

const createScore = compose(
  nums,
  trimValues(/\w+|\*/),
  formScore
)

const getScore = td => ensure(td, 4, 1).exists()
  ? createScore(td) 
  : []

module.exports = {
  getScore,
  nums
}