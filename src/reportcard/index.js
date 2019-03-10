
const axios = require('axios');
const parse = require('./parse');
const scrape = require('./scrape');
const condense = require('./condense');

/* expose a more friendly api */
module.exports = skywardURL => (
  auth => scrape(axios, parse, skywardURL)(auth).then(condense));
