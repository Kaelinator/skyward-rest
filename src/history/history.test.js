const test = require('ava');
const scrape = require('./scrape');

test('throws when given malformed arguments', (t) => {
  t.throws(() => scrape()(), /axios & skywardURL/, 'given no arguments');
  t.throws(() => scrape(x => x, 'fakeUrl')({}), /dwd, wfaacl, & encses are required/, 'given no credentials');
});

test('credentials placed correctly', (t) => {
  const auth = { dwd: 1, wfaacl: 2, encses: 3 };
  const mockAxios = ({ data }) => data;

  t.is(scrape(mockAxios, 'fakeUrl')(auth), 'dwd=1&wfaacl=2&encses=3');
});

const parse = require('../reportcard/parse');
const payload = require('./data/payload.data');

test('reportcard parse extracts javascript', (t) => {
  t.deepEqual(parse({ data: payload.slimHtml }), { x: 'marks the spot' });
});
