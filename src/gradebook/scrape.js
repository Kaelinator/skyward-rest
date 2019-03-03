const body = ({ dwd, wfaacl, encses }) => {
  if (!dwd || !wfaacl || !encses) throw new TypeError('dwd, wfaacl, & encses are required');

  return `dwd=${dwd}&wfaacl=${wfaacl}&encses=${encses}`;
};

module.exports = (axios, parse) => (gradebookEndpoint, auth) => {
  if (!gradebookEndpoint || !auth) throw new TypeError('gradebookEndpoint & auth are required');

  return axios(gradebookEndpoint, body(auth))
    .then(parse);
};
