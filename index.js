const scrape = require('./scrape.js')
const Promise = require('bluebird')

// Error.stackTraceLimit = 50

// const skyward = module.exports = (url, sId, pass) => scrape(url, sId, pass)

// const pretty = (d) => JSON.stringify(d, null, 2)

// skyward('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')('s592100', 'pis.12345')

Promise.resolve(scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')('s531758', 'ASDF;lkj'))
	.then(x => {
		x.scrape('PR4')
			.then(data => data.forEach(d => console.log(`${d}`)))
			// .then(x.scrape('PR5'))
			// .then(console.log)
	})
