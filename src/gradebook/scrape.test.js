const test = require('tape');
const Promise = require('bluebird');

const scrape = require('./scrape');

test('gradebook scrape', (t) => {
  t.plan(3);
  t.throws(() => scrape()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);
  const mockParser = x => x;

  t.throws(() => scrape(mockAxios, mockParser, 'fakeUrl')({}), /TypeError/, 'given no auth data');

  const auth = { dwd: 1, wfaacl: 2, encses: 3 };

  scrape(mockAxios, mockParser, 'fakeUrl')(auth)
    .then(result => t.equal(result, 'dwd=1&wfaacl=2&encses=3', 'auth data placed correctly'));
});
