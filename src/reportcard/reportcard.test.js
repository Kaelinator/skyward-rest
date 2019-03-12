const test = require('ava');
const Promise = require('bluebird');
const fs = require('fs');

Promise.promisifyAll(fs);

const scrape = require('./scrape');

test('throws when given malformed arguments', (t) => {
  t.plan(2);

  t.throws(() => scrape()(), /axios & skywardURL/, 'given no arguments');
  t.throws(() => scrape(x => x, 'fakeUrl')({}), /dwd, wfaacl, & encses/, 'given no auth data');
});

test('auth data placed correctly', (t) => {
  t.plan(1);

  const auth = { dwd: 1, wfaacl: 2, encses: 3 };
  const mockAxios = ({ data }) => Promise.resolve(data);

  return scrape(mockAxios, 'fakeUrl')(auth)
    .then(result => t.is(result, 'dwd=1&wfaacl=2&encses=3'));
});

const parse = require('./parse');

test('parse finds x', (t) => {
  t.plan(1);

  return fs.readFileAsync('./src/reportcard/data/slim.data.html')
    .then(res => res.toString())
    .then((data) => {
      t.deepEqual(parse({ data }), { x: 'marks the spot' });
    })
    .catch(t.fail);
});

test('parse executes without throwing', (t) => {
  t.plan(1);

  return fs.readFileAsync('./src/reportcard/data/full.data.html')
    .then(res => res.toString())
    .then((data) => {
      t.notThrows(() => parse({ data }));
    })
    .catch(t.fail);
});

const condense = require('./condense');
const payload = require('./data/payload.data');

test('condense handles malformed input', (t) => {
  t.plan(3);

  t.throws(() => condense({}), /stuGradesGrid not found/, 'no \'stuGradesGrid\' key exists');

  const noTb = { stuGradesGrid_74477_004: {} };
  t.throws(() => condense(noTb), /tb not found/, 'no \'tb\' key exists');

  const noR = { stuGradesGrid_74477_004: { tb: {} } };
  t.deepEqual(condense(noR), [], 'no \'r\' key exists');
});

test('condense matches example data', (t) => {
  t.plan(4);

  const payloadTest = ({ input, output }, message) => t.deepEqual(condense(input), output, message);
  payloadTest(payload.slimSingleCourse, 'matches with minimal single course data');
  payloadTest(payload.fullSingleCourse, 'matches with full single course data');
  payloadTest(payload.slimMultiCourse, 'matches with slim multi course data');
  payloadTest(payload.fullMultiCourse, 'matches with full multi course data');
});
