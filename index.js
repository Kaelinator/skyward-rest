
const axios = require('axios');
const fs = require('fs');
const Promise = require('bluebird');

Promise.promisifyAll(fs);

require('dotenv').config();

const decode = require('./src/login/decode');
const login = require('./src/login/login')(axios, decode, 'https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/');
const parse = require('./src/gradebook/parse');
const scrape = require('./src/gradebook/scrape')(axios, parse, 'https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/');


login({ user: process.env.SKY_USER, pass: process.env.SKY_PASS })
  .then(scrape)
  .then(data => JSON.stringify(data, null, 2))
  .then(data => fs.writeFileAsync('./tmp/output.json', data))
  .then(() => console.log('done'))
  .catch(console.err);
