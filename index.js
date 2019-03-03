
const login = require('./src/login');
require('dotenv').config();

login(process.env.SKY_USER, process.env.SKY_PASS)
  .then(console.log);
