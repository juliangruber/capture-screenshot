var screenshot = require('./');
var fs = require('fs');
var join = require('path').join;

screenshot('http://ghub.io/')
  .width(320)
  .height(320)
  .clip()
  .capture(function (err, img) {
    if (err) throw err;
    fs.writeFileSync(join(__dirname, '/example-clipped.png'), img);
    console.log('open example-clipped.png');
  });
