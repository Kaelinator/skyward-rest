
const axios = require('axios');

axios.get('https://kaelkirk.com/')
  .then(res => res.data)
  .then(console.log);
