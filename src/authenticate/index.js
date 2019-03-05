
const axios = require('axios');
const decode = require('./decode');
const login = require('./login');

/* expose a more friendly api */
module.exports = skywardURL => (user, pass) => login(axios, decode, skywardURL)({ user, pass });
