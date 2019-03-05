const test = require('tape');
const Promise = require('bluebird');
const fs = require('fs');
const parse = require('./parse');

Promise.promisifyAll(fs);

test('gradebook parser', (t) => {
  t.plan(2);

  fs.readFileAsync('./src/gradebook/data/slim.html')
    .then(res => res.toString())
    .then((data) => {
      t.deepEqual(parse({ data }), { x: 'marks the spot' });
    })
    .catch(t.fail);

  fs.readFileAsync('./src/gradebook/data/full.html')
    .then(res => res.toString())
    .then((data) => {
      t.doesNotThrow(() => parse({ data }));
    })
    .catch(t.fail);
});

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
