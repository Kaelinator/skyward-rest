const axios = require('axios');
const scrape = require('./scrape');
const parse = require('./parse');

module.exports = skywardURL => (
  auth => (
    (course, bucket) => scrape(axios, parse, skywardURL)(auth, course, bucket)
  )
);
