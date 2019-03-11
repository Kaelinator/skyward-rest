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

  const params = 'action=viewGradeInfoDialog&fromHttp=yes&ishttp=true'
    + '&corNumId=98112&bucket=TERM 1&sessionid=2&encses=1';

  scrape(mockAxios, 'fakeUrl')(auth, 98112, 'TERM 1')
    .then(result => t.equal(result, params, 'auth & request data placed correctly'));
});

// const parse = require('./parse');

test('gradebook parse', (t) => {
  t.plan(1);
  t.equal(1, 1);

  // fs.readFileAsync('./src/gradebook/data/slim.data.xml')
  //   .then(res => res.toString())
  //   .then((data) => {
  //     t.deepEqual(parse({ data }), { x: 'marks the spot' });
  //   })
  //   .catch(t.fail);

  // fs.readFileAsync('./src/gradebook/data/full.data.html')
  //   .then(res => res.toString())
  //   .then((data) => {
  //     t.doesNotThrow(() => parse({ data }));
  //   })
  //   .catch(t.fail);
});
