
const axios = require('axios');
const login = require('./src/login/login')(axios, x => x);
// const scrape = require('./src/gradebook/scrape')(require('axios'));
// const parse = require('./src/gradebook/parse');
require('dotenv').config();

login(process.env.SKY_URL, { user: process.env.SKY_USER, pass: process.env.SKY_PASS })
  // .then(scrape)
  // .then(parse)
  .then(console.log);
