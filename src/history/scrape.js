
const body = ({ dwd, wfaacl, encses }) => {
  if (!dwd || !wfaacl || !encses) throw new TypeError('dwd, wfaacl, & encses are required');

  return `dwd=${dwd}&wfaacl=${wfaacl}&encses=${encses}`;
};

module.exports = (axios, skywardURL) => (auth) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  return axios({
    url: '/sfacademichistory001.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(auth),
  });
};
