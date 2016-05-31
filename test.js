var test = require('tape');
var Screenshot = require('./');
var http = require('http');

var server = http.createServer(function (req, res) {
  res.end('ohai!');
}).listen(function () {
  var url = 'http://localhost:' + server.address().port;

  test('screenshot', function (t) {
    t.plan(3);
    Screenshot(url)
      .capture(function (err, pic) {
        t.error(err);
        t.ok(pic);
        t.ok(Buffer.isBuffer(pic));
      });
  });

  test('custom args', function (t) {
    var s = Screenshot(url)
      .width(1024)
      .height(768)
      .timeout(100)
      .format('jpeg')
      .clip();
    t.equal(s._width, 1024);
    t.equal(s._height, 768);
    t.equal(s._timeout, 100);
    t.equal(s._format, 'JPG');
    t.equal(s._clip, true);
    t.end();
  });

  test('obj', function (t) {
    var s = Screenshot(url, {
      width: 1024,
      height: 768,
      timeout: 100,
      format: 'jpeg',
      url: 'trololo',
      clip: true
    });
    t.equal(s._width, 1024);
    t.equal(s._height, 768);
    t.equal(s._timeout, 100);
    t.equal(s._format, 'JPG');
    t.equal(s.url, url);
    t.equal(s._clip, true);
    t.end();
  });

  test('generator', function (t) {
    t.plan(3);
    Screenshot(url)
      .capture()(function (err, pic) {
        t.error(err);
        t.ok(pic);
        t.ok(Buffer.isBuffer(pic));
        server.close();
      });
  });
});

