const scrape  = require('./src/lib/scrape')
const Promise = require('bluebird')
const fs      = require('fs')

const save = data => {
  const contents = (data) => `module.exports = ${JSON.stringify(data, null, 2)}`
	const path = (f) => `tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')(process.env.SKYUSER, process.env.SKYPASS)
	.then(skyward => {
		
		skyward.scrapeLegacy()
			.then(save)
			.then(() => skyward.close())
	})

module.exports = scrape
