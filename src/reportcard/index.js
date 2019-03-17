
const axios = require('axios');
const scrape = require('./scrape');
const parse = require('./parse');
const condense = require('./condense');

/* expose a more friendly api */
module.exports = {
  fetch: skywardURL => (
    auth => scrape(axios, skywardURL)(auth)
  ),

  getData: raw => condense(parse(raw)),
};
