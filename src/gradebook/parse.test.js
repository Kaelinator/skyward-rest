const test = require('tape');
const Promise = require('bluebird');
const fs = require('fs');
const parse = require('./parse');

Promise.promisifyAll(fs);

test('gradebook parser', (t) => {
  t.plan(1);

  fs.readFileAsync('./src/gradebook/data/slim.html')
    .then(res => res.toString())
    .then((data) => {
      t.deepEqual(parse({ data }), { x: 'marks the spot' });
    })
    .catch(t.fail)
});
