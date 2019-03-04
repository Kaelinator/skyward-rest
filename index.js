
const login = require('./src/login/login');
const scrape = require('./src/gradebook/scrape')(require('axios'));
const parse = require('./src/gradebook/parse');
require('dotenv').config();

login(process.env.SKY_USER, process.env.SKY_PASS)
  // .then(scrape)
  // .then(parse)
  .then(console.log);
