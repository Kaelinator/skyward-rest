const scrape = require('./scrape.js')
const Promise = require('bluebird')

// Error.stackTraceLimit = 50

// const skyward = module.exports = (url, sId, pass) => scrape(url, sId, pass)

// const pretty = (d) => JSON.stringify(d, null, 2)

// skyward('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w', 's592100', 'pis.12345')
// scrape.init('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w', 's531758', 'ASDF;lkj')
// (async () => {

Promise.resolve(scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')('s531758', 'ASDF;lkj'))
	.then(x => x.close())
// })()
	// .then(Promise.all)
	// .then(pretty)
	// .then(console.log)
	// .catch(err => console.log(err))
