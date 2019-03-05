
const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

require('dotenv').config();

const gradebook = require('./src/gradebook');
const authenticate = require('./src/authenticate');

const scrape = skywardURL => (user, pass) => authenticate(skywardURL)(user, pass)
  .then(gradebook(skywardURL));

console.time('scraped');
scrape(process.env.SKY_URL)(process.env.SKY_USER, process.env.SKY_PASS)
  .then(() => console.timeEnd('scraped'));
