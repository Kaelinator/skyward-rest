const scrape  = require('./lib/scrape.js')
const Promise = require('bluebird')
const fs      = require('fs')

const save = data => {

	const contents = (data) => `module.exports = ${JSON.stringify(data)}`
	const path = (f) => `lib/tests/data/tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')(process.env.SKYUSER, process.env.SKYPASS)
	.then(skyward => {
		
		skyward.scrape()
			.then(save)
			.then(() => skyward.close())
	})
	.catch(console.log.bind(console, 'INDEX:'))

module.exports = scrape
