const scrape  = require('./lib/scrape.js')
const Promise = require('bluebird')
const fs      = require('fs')

// scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')(process.env.SKYUSER, process.env.SKYPASS)
// 	.then(skyward => {
		
// 		skyward.scrape()
// 			.then(save)
// 			.then(() => skyward.close())
// 	})
// 	.catch(console.log.bind(console, 'INDEX:'))

module.exports = scrape
