const test = require('ava');
const Promise = require('bluebird');

const login = require('./login');

test('throws correctly', (t) => {
  t.plan(2);
  t.throws(() => login()(), /axios & skywardURL/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);

  t.throws(() => login(mockAxios, 'fakeUrl')({}), /user & pass/, 'given no credentials');
});

test('credentials placed correctly', (t) => {
  const mockCredentials = { user: 1, pass: 2 };
  const mockAxios = ({ data }) => Promise.resolve(data);

  t.plan(1);
  return login(mockAxios, 'fakeUrl')(mockCredentials)
    .then((res) => {
      t.is(res, 'requestAction=eel&codeType=tryLogin&login=1&password=2');
    });
});

const decode = require('./decode');

test('decode', (t) => {
  t.plan(4);

  t.throws(() => decode(), /data is required/, 'given no arguments');
  t.throws(() => decode({ data: '<li>Invalid login or password.</li>' }), /Invalid Skyward credentials/, 'given invalid credentials');

  const data = '<li>319238^279419^23009402^27834052^58192^s219261^2^sfhome01.w^false^no ^no^no^^zdkNjlfkjbwanfcX^jDWadubjdaCOdEjY</li>';
  const expected = {
    dwd: '319238', wfaacl: '27834052', encses: 'jDWadubjdaCOdEjY', sessionId: '279419%1523009402',
  };
  t.deepEqual(decode({ data }), expected, 'identifies tokens');

  t.throws(() => decode({ data: data.slice(30) }), /Malformed auth data/, 'given malformed data');
});
