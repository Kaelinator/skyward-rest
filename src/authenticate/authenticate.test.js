const test = require('ava');

const login = require('./login');

test('throws when given malformed arguments', (t) => {
  t.throws(() => login()(), /axios & skywardURL/, 'given no arguments');
  t.throws(() => login(x => x, 'fakeUrl')({}), /user & pass/, 'given no credentials');
});

test('credentials placed correctly', (t) => {
  const mockCredentials = { user: 1, pass: 2 };
  const mockAxios = ({ data }) => data;

  t.is(login(mockAxios, 'fakeUrl')(mockCredentials), 'requestAction=eel&codeType=tryLogin&login=1&password=2');
});

const decode = require('./decode');

test('decode identifies incorrect credentials & throws when given malformed auth data', (t) => {
  t.throws(() => decode({ data: '<li>Invalid login or password.</li>' }), /Invalid Skyward credentials/, 'given invalid credentials');
  t.throws(() => decode(), /data is required/, 'given no arguments');
  t.throws(() => decode({ data: '<i\'^M /mAlf^Or^mEd>' }), /Malformed auth data/, 'given malformed data');
});

test('decode identifies tokens', (t) => {
  const data = '<li>319238^279419^23009402^27834052^58192^s219261^2^sfhome01.w^false^no ^no^no^^zdkNjlfkjbwanfcX^jDWadubjdaCOdEjY</li>';
  const expected = {
    dwd: '319238', wfaacl: '27834052', encses: 'jDWadubjdaCOdEjY', sessionId: '279419%1523009402',
  };
  t.deepEqual(decode({ data }), expected);
});
