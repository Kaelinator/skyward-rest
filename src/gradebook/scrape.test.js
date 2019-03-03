const test = require('tape');

const scrape = require('./scrape');

test('scrape', (t) => {
  t.throws(() => scrape(), /TypeError/, 'given no arguments');
});
