const scrape = require('./scrape.js')
const Promise = require('bluebird')

const skyward = module.exports = 
    (url) =>
        (sId, pass, target) => scrape(url, sId, pass, target)

const pretty = (d) => JSON.stringify(d, null, 2)

skyward('https://skyward.kleinisd.net/')('s531758', 'ASDF;lkj', 'Q2')
    .then(Promise.all)
    .then(pretty)
    .then(console.log)
    .catch(_ => console.log('There was an error!'))
