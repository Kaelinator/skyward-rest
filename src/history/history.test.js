const $ = require('cheerio');
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

const chunk = require('./chunk');

test('chunk helper function regroups arrays', (t) => {
  const chunkBy2s = [[0, 1, 2, 3]].reduce(chunk(n => n % 2 === 0), []);
  t.deepEqual(chunkBy2s, [[0, 1], [2, 3]], 'chunks with single nested array');

  const chunkBy10s = [[0, 5, 10, 15], [20, 25], [30, 35, 40, 45, 50, 55]]
    .reduce(chunk(n => n % 10 === 0), []);

  t.deepEqual(chunkBy10s, [[0, 5], [10, 15], [20, 25], [30, 35], [40, 45], [50, 55]], 'chunks with multiple nested arrays');

  const chunkAdjacent = [[0, 5, 10, 20, 30, 31, 32, 35], [40, 45]]
    .reduce(chunk(n => n % 10 === 0), []);
  t.deepEqual(chunkAdjacent, [[0, 5], [10], [20], [30, 31, 32, 35], [40, 45]], 'chunks with adjacent matching values');

  const isHeader = row => /(\d+)\D+(\d+)\D+(\d+)/.test($(row.c[0].h).find('div').first().text());

  const { input, output } = payload.chunkConjoinedYear;
  t.deepEqual(input.reduce(chunk(isHeader), []), output, 'chunks by each year');
});

const condense = require('./condense');

test('reportcard condense extracts meaningful data', (t) => {
  const payloadTest = ({ input, output }, message) => t.deepEqual(condense(input), output, message);

  payloadTest(payload.slimSingle, 'matches with minimal single year, single course data');
  payloadTest(payload.slimMultiCourse, 'matches with minimal single year, multi course data');
  payloadTest(payload.slimMultiYear, 'matches with minimal multi year, single course data');
  payloadTest(payload.fullConjoinedYear, 'matches with full multi conjoined years with multi course data');
});
