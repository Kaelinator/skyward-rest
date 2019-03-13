const test = require('ava');
const scrape = require('./scrape');

test('throws when given malformed arguments', (t) => {
  t.plan(2);

  t.throws(() => scrape()(), /axios & skywardURL/, 'given no arguments');
  t.throws(() => scrape(x => x, 'fakeUrl')({}), /dwd, wfaacl, & encses are required/, 'given no credentials');
});

test('credentials placed correctly', (t) => {
  t.plan(1);

  const auth = { dwd: 1, wfaacl: 2, encses: 3 };
  const mockAxios = ({ data }) => data;

  t.is(scrape(mockAxios, 'fakeUrl')(auth), 'dwd=1&wfaacl=2&encses=3');
});
