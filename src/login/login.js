
const axios = require('axios');

const loginEndpoint = 'https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/skyporthttp.w';
const body = (user, pass) => `requestAction=eel&codeType=tryLogin&login=${user}&password=${pass}`;

module.exports = (user, pass) => axios.post(loginEndpoint, body(user, pass))
  .then(res => res.data);
