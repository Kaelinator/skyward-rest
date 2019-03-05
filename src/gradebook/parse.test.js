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
