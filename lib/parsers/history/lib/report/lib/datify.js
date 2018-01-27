
const { ensure } = require('../../../../../helpers').traversers

const contextify = tr => tr

module.exports = trs => trs.map(contextify)