const test = require('tape');
const Promise = require('bluebird');

const scrape = require('./scrape');

test('gradebook scrape', (t) => {
  t.plan(3);

  t.throws(() => scrape()(), /TypeError/, 'given no arguments');

  const mockAxios = ({ data }) => Promise.resolve(data);
  const mockParser = x => x;

  t.throws(() => scrape(mockAxios, mockParser, 'fakeUrl')({}), /TypeError/, 'given no auth data');

  const auth = { encses: 1, sessionId: 2 };

  const params = 'action=viewGradeInfoDialog&fromHttp=yes&ishttp=true'
    + '&corNumId=98112&bucket=TERM 1&sessionid=2&encses=1';

  scrape(mockAxios, mockParser, 'fakeUrl')(auth, 98112, 'TERM 1')
    .then(result => t.equal(result, params, 'auth & request data placed correctly'));
});
