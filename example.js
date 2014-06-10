var screenshot = require('./');
var fs = require('fs');

screenshot('http://github.com')
  .width(1024)
  .height(768)
  .clip()
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/example.png', img);
    console.log('open example.png');
  });
