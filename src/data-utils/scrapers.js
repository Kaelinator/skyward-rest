
const { ensure }                            = require('./traversers')
const { compose }                           = require('./structures')
const { mapObj, numericValues, trimValues } = require('./modifiers')

const formScore = td => ({
  earned: ensure(td, 4, 0).get('data'),
  total: ensure(td, 4, 2).get('data')
})

const createScore = compose(
  numericValues,
  trimValues(/\w+|\*/),
  formScore
)

const getScore = td => ensure(td, 4, 1).exists()
  ? createScore(td) 
  : []

module.exports = {
  getScore
}