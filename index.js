
const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

require('dotenv').config();

const reportcard = require('./src/reportcard');
const authenticate = require('./src/authenticate');
const gradebook = require('./src/gradebook');
const history = require('./src/history');

const scrape = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
  .then(auth => Promise.resolve(reportcard(skywardURL)(auth))
    .map(({ course, scores }) => (
      Promise.resolve(scores)
        .map(({ bucket }) => gradebook(skywardURL)(auth)(course, bucket)))));

const scrapeHistory = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
  .then(history(skywardURL));

// scrapeHistory(process.env.SKY_URL)(process.env.SKY_USER, process.env.SKY_PASS)
//   .then(({ data }) => fs.writeFileAsync('./tmp/output.json', data))
//   .then(() => console.log('done'))
//   .catch(console.err);

fs.readFileAsync('./tmp/history.html')
  .then(data => data.toString())
  .then(JSON.stringify)
  .then(json => fs.writeFileAsync('./tmp/history.json', json))
  .then(() => console.log('done'))
  .catch(console.log);

// scrape(process.env.SKY_URL)(process.env.SKY_USER, process.env.SKY_PASS)
//   .then(data => JSON.stringify(data, null, 2))
//   .then(xml => fs.writeFileAsync('./tmp/output.json', xml))
//   .then(() => console.log('done'))
//   .catch(console.err);
