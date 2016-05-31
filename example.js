var screenshot = require('./');
var fs = require('fs');
var join = require('path').join;

screenshot('http://ghub.io/')
  .width(800)
  .height(600)
  .capture(function (err, img) {
    if (err) throw err;
    fs.writeFileSync(join(__dirname, '/example.png'), img);
    console.log('open example.png');
  });
