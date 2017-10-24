const scrape = require('./scrape.js')
const Promise = require('bluebird')

const skyward = module.exports = 
    (url) =>
        (sId, pass) => scrape(url, sId, pass)

skyward('https://skyward.kleinisd.net/')('s531758', 'ASDF;lkj')
    .then(Promise.props)
    .then((x) => x['TERM 6'][0])
    .then(console.log)
