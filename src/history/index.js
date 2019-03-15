const axios = require('axios');
const scrape = require('./scrape');

module.exports = skywardURL => (
  auth => scrape(axios, skywardURL)(auth).then(x => x)
);
