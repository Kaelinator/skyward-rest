const test = require('tape');
const Promise = require('bluebird');
const fs = require('fs');

Promise.promisifyAll(fs);

const scrape = require('./scrape');

test('gradebook scrape', (t) => {
  t.plan(3);

  t.throws(() => scrape()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);

  t.throws(() => scrape(mockAxios, 'fakeUrl')({}), /TypeError/, 'given no auth data');

  const auth = { encses: 1, sessionId: 2 };

  const expectedBody = 'action=viewGradeInfoDialog&fromHttp=yes&ishttp=true'
    + '&corNumId=98112&bucket=TERM 1&sessionid=2&encses=1';

  scrape(mockAxios, 'fakeUrl')(auth, 98112, 'TERM 1')
    .then(result => t.equal(result, expectedBody, 'auth & request data placed correctly'));
});

const parse = require('./parse');
const payload = require('./data/slim.data');

test('gradebook parse', (t) => {
  t.plan(2);

  t.deepEqual(parse({ data: payload.PR1.input }), payload.PR1.output);
  t.deepEqual(parse({ data: payload.S1.input }), payload.S1.output);
});
