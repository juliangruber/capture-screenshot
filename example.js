var screenshot = require('./');
var fs = require('fs');

screenshot('http://ghub.io/')
  .width(800)
  .height(600)
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/example.png', img);
    console.log('open example.png');
  });
