
const axios = require('axios');
const scrape = require('./scrape');
const parse = require('./parse');

module.exports = {
  fetch: skywardURL => (
    auth => (
      (course, bucket) => scrape(axios, skywardURL)(auth, course, bucket)
    )
  ),

  getData: parse,
};
