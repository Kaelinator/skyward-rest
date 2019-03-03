const test = require('tape');
const Promise = require('bluebird');

const scrape = require('./scrape');

test('gradebook scrape', (t) => {
  t.plan(3);
  t.throws(() => scrape()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);

  t.throws(() => scrape(mockAxios)('fakeUrl', {}), /TypeError/, 'given no auth data');

  const mockParser = x => x;
  const auth = { dwd: 1, wfaacl: 2, encses: 3 };

  scrape(mockAxios, mockParser)('fakeUrl', auth)
    .then(result => t.equal(result, 'dwd=1&wfaacl=2&encses=3', 'auth data placed correctly'));
});
