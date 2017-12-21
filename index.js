const scrape = require('./scrape.js')
const Promise = require('bluebird')

// Error.stackTraceLimit = 50

const skyward = module.exports = (url, sId, pass) => scrape(url, sId, pass)

const pretty = (d) => JSON.stringify(d, null, 2)

skyward('https://skyward.kleinisd.net/', 's531758', 'ASDF;lkj')
    // .then(Promise.all)
    // .then(pretty)
    // .then(console.log)
    // .catch(err => console.log(err))
