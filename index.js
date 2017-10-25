const scrape = require('./scrape.js')
const Promise = require('bluebird')

const skyward = module.exports = 
    (url) =>
        (sId, pass, target) => scrape(url, sId, pass, target)

// skyward('https://skyward.kleinisd.net/')('s592100', 'pis.12345', 'S1')
skyward('https://skyward.kleinisd.net/')('s531758', 'ASDF;lkj', 'S1')
    // .then(Promise.props)
    .then(Promise.all)
    .then(console.log)
