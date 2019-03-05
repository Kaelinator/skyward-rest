const test = require('tape');
const Promise = require('bluebird');

const login = require('./login');

test('login', (t) => {
  t.plan(3);
  t.throws(() => login()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);

  t.throws(() => login(mockAxios)('fakeUrl', {}), /TypeError/, 'given no credentials');

  const mockDecode = x => x;
  const mockCredentials = { user: 1, pass: 2 };

  login(mockAxios, mockDecode)('fakeUrl', mockCredentials)
    .then((res) => {
      t.equal(res, 'requestAction=eel&codeType=tryLogin&login=1&password=2', 'credentials placed correctly');
    });
});
