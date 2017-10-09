const scrape = require('./scrape.js')

const skyward = module.exports = 
    (url) =>
        (sId, pass) => scrape(url, sId, pass)