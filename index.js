const scrape = require('./lib/scrape.js')
const fs     = require('fs')

const save = data => {

	const contents = (data) => `module.exports = ${JSON.stringify(data)}`
	const path = (f) => `tests/tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

module.exports = scrape
