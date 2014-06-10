var screenshot = require('./');
var fs = require('fs');

screenshot('http://ghub.io/')
  .width(320)
  .height(320)
  .clip()
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/example.png', img);
    console.log('open example.png');
  });
