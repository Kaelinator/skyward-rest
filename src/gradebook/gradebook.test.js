const test = require('ava');
const Promise = require('bluebird');
const fs = require('fs');

Promise.promisifyAll(fs);

const scrape = require('./scrape');

test('throws when given malformed arguments', (t) => {
  t.plan(2);

  t.throws(() => scrape()(), /axios & skywardURL/, 'given no arguments');
  t.throws(() => scrape(x => x, 'fakeUrl')({}), /encses & sessionId/, 'given no auth data');
});

test('auth & request data placed correctly', (t) => {
  t.plan(1);

  const auth = { encses: 1, sessionId: 2 };
  const mockAxios = ({ data }) => Promise.resolve(data);

  const expectedBody = 'action=viewGradeInfoDialog&fromHttp=yes&ishttp=true'
    + '&corNumId=98112&bucket=TERM 1&sessionid=2&encses=1';

  return scrape(mockAxios, 'fakeUrl')(auth, 98112, 'TERM 1')
    .then(result => t.is(result, expectedBody));
});

const parse = require('./parse');
const payload = require('./data/slim.data');

const testParsePlan = t => ({ input, output }, message) => {
  const result = parse({ data: input });

  t.deepEqual(result.course, output.course, `course value matches ${message}`);
  t.deepEqual(result.instructor, output.instructor, `instructor value matches ${message}`);
  t.deepEqual(result.lit, output.lit, `lit value matches ${message}`);
  t.deepEqual(result.period, output.period, `period value matches ${message}`);
  t.deepEqual(result.grade, output.grade, `grade value matches ${message}`);
  t.deepEqual(result.score, output.score, `score value matches ${message}`);
  t.deepEqual(result.breakdown, output.breakdown, `breakdown value matches ${message}`);
  t.deepEqual(result.gradebook, output.gradebook, `breakdown value matches ${message}`);
};

test.cb('parse matches example data', (t) => {
  const testParse = testParsePlan(t);

  testParse(payload.simplePR, 'with a simple Progress Report');
  testParse(payload.simpleSem, 'with a simple Semester');
  testParse(payload.emptyMajorPR, 'with a Progress Report missing major grades');
  t.end();
});
