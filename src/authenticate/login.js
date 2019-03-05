
const body = ({ user, pass }) => {
  if (!user || !pass) throw new TypeError('user and pass are required');

  return `requestAction=eel&codeType=tryLogin&login=${user}&password=${pass}`;
};

module.exports = (axios, decode, skywardURL) => (credentials) => {
  if (!axios || !decode || !skywardURL) throw new TypeError('axios, decode, & skywardURL are required');

  return axios({
    url: '/skyporthttp.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(credentials),
  }).then(decode);
};
