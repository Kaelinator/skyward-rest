
const body = ({ encses, sessionId }, course, bucket) => {
  if (!encses || !sessionId) throw new TypeError('encses & sessionId are required');

  return 'action=viewGradeInfoDialog&fromHttp=yes&ishttp=true'
  + `&corNumId=${course}&bucket=${bucket}`
  + `&sessionid=${sessionId}&encses=${encses}`;
};

module.exports = (axios, skywardURL) => (auth, course, bucket) => {
  if (!axios || !skywardURL) throw new TypeError('axios & skywardURL are required');

  return axios({
    url: '/httploader.p?file=sfgradebook001.w',
    baseURL: skywardURL,
    method: 'post',
    data: body(auth, course, bucket),
  });
};
