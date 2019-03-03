
const login = require('./src/login/login');
require('dotenv').config();

login(process.env.SKY_USER, process.env.SKY_PASS)
  .then(console.log);
