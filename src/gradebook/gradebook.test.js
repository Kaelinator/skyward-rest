const test = require('tape');
const Promise = require('bluebird');
const fs = require('fs');
const parse = require('./parse');

Promise.promisifyAll(fs);

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


test('gradebook parse', (t) => {
  t.plan(2);

  fs.readFileAsync('./src/gradebook/data/slim.data.html')
    .then(res => res.toString())
    .then((data) => {
      t.deepEqual(parse({ data }), { x: 'marks the spot' });
    })
    .catch(t.fail);

  fs.readFileAsync('./src/gradebook/data/full.data.html')
    .then(res => res.toString())
    .then((data) => {
      t.doesNotThrow(() => parse({ data }));
    })
    .catch(t.fail);
});

const condense = require('./condense');
const payload = require('./data/payload.data');

test('gradebook condense', (t) => {
  t.plan(5);

  t.throws(() => condense({}), /stuGradesGrid not found/, 'no \'stuGradesGrid\' key exists');

  const noTb = { stuGradesGrid_74477_004: {} };
  t.throws(() => condense(noTb), /tb not found/, 'no \'tb\' key exists');

  const noR = { stuGradesGrid_74477_004: { tb: {} } };
  t.deepEqual(condense(noR), [], 'no \'r\' key exists');

  const payloadTest = ({ input, output }, message) => t.deepEqual(condense(input), output, message);
  payloadTest(payload.slimExample, 'matches with minimal data');
  payloadTest(payload.fullCourseExample, 'matches with full course data');
});
