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
  var s = Screenshot('http://google.com')
    .width(1024)
    .height(768)
    .timeout(100)
    .format('jpeg');
  t.equal(s._width, 1024);
  t.equal(s._height, 768);
  t.equal(s._timeout, 100);
  t.equal(s._format, 'JPG');
  t.end();
});

test('obj', function(t) {
  var s = Screenshot('http://google.com', {
    width: 1024,
    height: 768,
    timeout: 100,
    format: 'jpeg'  
  });
  t.equal(s._width, 1024);
  t.equal(s._height, 768);
  t.equal(s._timeout, 100);
  t.equal(s._format, 'JPG');
  t.end();
});

test('generator', function(t) {
  t.plan(3);
  Screenshot('http://google.com')
    .capture()(function(err, pic) {
      t.error(err);
      t.ok(pic);
      t.ok(Buffer.isBuffer(pic));
    });
});
