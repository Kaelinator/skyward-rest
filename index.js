const scrape = require('./scrape.js')
const Promise = require('bluebird')

const skyward = module.exports = 
    (url) =>
        (sId, pass, target) => scrape(url, sId, pass, target)

skyward('https://skyward.kleinisd.net/')('s531758', 'ASDF;lkj', 'Q2')
    .then(Promise.all)
    .then(console.log)
