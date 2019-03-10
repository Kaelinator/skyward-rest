
const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

require('dotenv').config();

const reportcard = require('./src/reportcard');
const authenticate = require('./src/authenticate');

const scrape = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
  .then(reportcard(skywardURL));

scrape(process.env.SKY_URL)(process.env.SKY_USER, process.env.SKY_PASS)
  .then(data => JSON.stringify(data, null, 2))
  .then(json => fs.writeFileAsync('./tmp/output2.json', json))
  .then(() => console.log('done'))
  .catch(console.err);
