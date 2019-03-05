const test = require('tape');

const decode = require('./decode');

test('decode', (t) => {
  t.plan(4);

  t.throws(() => decode(), /data is required/, 'given no arguments');
  t.throws(() => decode({ data: '<li>Invalid login or password.</li>' }), /Invalid Skyward credentials/, 'given invalid credentials');

  const data = '<li>319238^279419^23009402^27834052^58192^s219261^2^sfhome01.w^false^no ^no^no^^zdkNjlfkjbwanfcX^jDWadubjdaCOdEjY</li>';
  t.deepEqual(decode({ data }), { dwd: '319238', wfaacl: '27834052', encses: 'jDWadubjdaCOdEjY' }, 'identifies tokens');

  t.throws(() => decode({ data: data.slice(30) }), /Malformed auth data/, 'given malformed data');
});
