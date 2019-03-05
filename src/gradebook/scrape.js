
const body = ({ dwd, wfaacl, encses }) => {
  if (!dwd || !wfaacl || !encses) throw new TypeError('dwd, wfaacl, & encses are required');

  return `dwd=${dwd}&wfaacl=${wfaacl}&encses=${encses}`;
};

module.exports = (axios, parse) => (skywardURL, auth) => {
  if (!axios || !parse) throw new TypeError('axios & parse are required');
  if (!skywardURL || !auth) throw new TypeError('skywardURL & auth are required');

  return axios({
    url: '/sfgradebook001.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(auth),
  }).then(parse);
};
