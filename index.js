const scrape  = require('./lib/scrape.js')
const fs      = require('fs')
require('dotenv').config()

const save = data => {

	const contents = (data) => `module.exports = ${JSON.stringify(data)}`
	const path = (f) => `tests/tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

scrape(process.env.SKYURL)(process.env.SKYUSER, process.env.SKYPASS)
	.then(skyward => {
		
		skyward.scrape('S1')
			.then(save)
			.then(() => skyward.close())
	})

module.exports = scrape
