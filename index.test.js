const test = require('ava');
const fs = require('fs');
const Promise = require('bluebird');
require('dotenv').config();

Promise.promisifyAll(fs);

const skyward = require('./index');

const writeResults = prefix => ({ raw, data }) => Promise.all([
  fs.writeFileAsync(`./tmp/test/${prefix}_raw.html`, raw),
  fs.writeFileAsync(`./tmp/test/${prefix}_data.json`, JSON.stringify(data, null, 2)),
]);

const { SKY_USER, SKY_PASS, SKY_URL } = process.env;
const myisd = skyward(SKY_URL);

test.serial.skip('scrapeReport api integration', t => (
  myisd.scrapeReport(SKY_USER, SKY_PASS)
    .then(writeResults('report'))
    .then(t.pass)
    .catch(t.fail)
));

test.serial.skip('scrapeGradebook api integration', t => (
  myisd.scrapeGradebook(SKY_USER, SKY_PASS, { course: 97791, bucket: 'TERM 1' })
    .then(writeResults('gradebook'))
    .then(t.pass)
    .catch(t.fail)
));

test.serial.skip('scrapeHistory api integration', t => (
  myisd.scrapeHistory(SKY_USER, SKY_PASS)
    .then(writeResults('history'))
    .then(t.pass)
    .catch(t.fail)
));
