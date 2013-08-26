var test = require('tape');
var Screenshot = require('./');

test('screenshot', function(t) {
  t.plan(3);
  Screenshot('http://google.com')
    .capture(function(err, pic) {
      t.error(err);
      t.ok(pic);
      t.ok(Buffer.isBuffer(pic));
    });
});

test('custom args', function(t) {
  t.plan(3);
  Screenshot('http://google.com')
    .width(1024)
    .height(768)
    .timeout(100)
    .format('jpeg')
    .capture(function(err, pic) {
      t.error(err);
      t.ok(pic);
      t.ok(Buffer.isBuffer(pic));
    });
});
