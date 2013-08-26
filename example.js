var screenshot = require('./');
var fs = require('fs');

screenshot('http://google.com/')
  .width(800)
  .height(600)
  .timeout(1000)
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/example.png', img);
    console.log('open example.png');
  });
