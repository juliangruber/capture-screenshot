var exec = require('child_process').exec;

module.exports = Screenshot;

function Screenshot(url) {
  if (!(this instanceof Screenshot)) return new Screenshot(url);
  this.url = url;
  this.width(1024);
  this.height(768);
  this.timeout(0);
}

/**
 * Set `width`.
 *
 * @param {Number} width
 * @return {Screenshot}
 */

Screenshot.prototype.width = function(width) {
  this._width = width;
  return this;
};

/**
 * Set `height`.
 *
 * @param {Number} height
 * @return {Screenshot}
 */

Screenshot.prototype.height = function(height) {
  this._height = height;
  return this;
};

/**
 * Set `timeout` for PhantomJS.
 *
 * @param {Number} timeout
 * @return {Screenshot}
 * @todo Find more flexible mechanism
 */

Screenshot.prototype.timeout = function(timeout) {
  this._timeout = timeout;
  return this;
};

/**
 * Set output image format.
 *
 * Supported formats:
 *   - jpg, jpeg
 *   - png
 *   - gif
 *   
 * @param {String} format
 * @throws {TypeError}
 * @return {Screenshot}
 */

Screenshot.prototype.format = function(format) {
  format = format.toUpperCase();
  if (format == 'JPEG') format = 'JPG';
  if (['JPG', 'PNG', 'GIF'].indexOf(format) == -1)
    throw new TypeError('unknown format');
  this._format = format;
  return this;
};

/**
 * Capture the screenshot and call `fn` with `err` and `img`.
 *
 * @param {Function} fn
 */

Screenshot.prototype.capture = function(fn) {
  var args = [
    __dirname + '/script/render.js', this.url,
    this._width, this._height, this._timeout, this._format
  ];

  var opts = {
    maxBuffer: Infinity
  };

  exec('phantomjs ' + args.join(' '), opts, function (err, stdout) {
    fn(err, stdout && new Buffer(stdout, 'base64'));
  });
};

