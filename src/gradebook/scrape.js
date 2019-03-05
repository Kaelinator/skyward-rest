
const body = ({ dwd, wfaacl, encses }) => {
  if (!dwd || !wfaacl || !encses) throw new TypeError('dwd, wfaacl, & encses are required');

  return `dwd=${dwd}&wfaacl=${wfaacl}&encses=${encses}`;
};

module.exports = (axios, parse, skywardURL) => (auth) => {
  if (!axios || !parse || !skywardURL) throw new TypeError('axios, parse, & skywardURL are required');

  return axios({
    url: '/sfgradebook001.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(auth),
  }).then(parse);
};
