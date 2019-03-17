const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

require('dotenv').config();

const reportcard = require('./src/reportcard');
const gradebook = require('./src/gradebook');
const authenticate = require('./src/authenticate');
const history = require('./src/history');

const scrape = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
  .then(auth => Promise.resolve(reportcard(skywardURL)(auth))
    .map(({ course, scores }) => (
      Promise.resolve(scores)
        .filter(({ bucket }) => bucket === 'TERM 9')
        .map(({ bucket }) => gradebook(skywardURL)(auth)(course, bucket)))));

// const scrapeHistory = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
//   .then(history(skywardURL));

scrape(process.env.SKY_URL)(process.env.SKY_USER, process.env.SKY_PASS)
  .then(data => JSON.stringify(data, null, 2))
  .then(xml => fs.writeFileAsync('./tmp/output.json', xml))
  .then(() => console.log('done'))
  .catch(console.err);

// module.exports = {

// }