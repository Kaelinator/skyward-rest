const test = require('tape');
const Promise = require('bluebird');

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

const login = require('./login');

test('login', (t) => {
  t.plan(3);
  t.throws(() => login()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);
  const mockDecode = x => x;

  t.throws(() => login(mockAxios, mockDecode, 'fakeUrl')({}), /TypeError/, 'given no credentials');

  const mockCredentials = { user: 1, pass: 2 };

  login(mockAxios, mockDecode, 'fakeUrl')(mockCredentials)
    .then((res) => {
      t.equal(res, 'requestAction=eel&codeType=tryLogin&login=1&password=2', 'credentials placed correctly');
    });
});
