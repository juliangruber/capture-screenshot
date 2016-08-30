var exec = require('child_process').exec;
var join = require('path').join;

module.exports = Screenshot;

/**
 * Create screenshot object.
 *
 * @param {String} url
 * @param {Object=} opts
 * @return {Screenshot}
 */

function Screenshot (url, opts) {
  if (!(this instanceof Screenshot)) return new Screenshot(url, opts);
  this.url = url;

  this.width(1024);
  this.height(768);
  this.timeout(0);
  this.format('png');
  this.ignoreSslErrors(false);
  this.sslCertificatesPath(null);
  this.sslProtocol('sslv3');
  this.clip(false);

  Object.keys(opts || {}).forEach(function (key) {
    if (typeof this[key] === 'function') this[key](opts[key]);
  }.bind(this));
}

/**
 * Set `width`.
 *
 * @param {Number} width
 * @return {Screenshot}
 */

Screenshot.prototype.width = function (width) {
  this._width = width;
  return this;
};

/**
 * Set `height`.
 *
 * @param {Number} height
 * @return {Screenshot}
 */

Screenshot.prototype.height = function (height) {
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

Screenshot.prototype.timeout = function (timeout) {
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

Screenshot.prototype.format = function (format) {
  format = format.toUpperCase();
  if (format === 'JPEG') format = 'JPG';
  if (['JPG', 'PNG', 'GIF'].indexOf(format) === -1) {
    throw new TypeError('unknown format');
  }
  this._format = format;
  return this;
};

/**
 * Ignore SSL Errors.
 *
 * @return {Screenshot}
 */

Screenshot.prototype.ignoreSslErrors = function () {
  this._ignoreSslErrors = true;
  return this;
};

/**
 * Set the SSL certificates path for PhantomJS.
 *
 * @param {String} path
 * @return {Screenshot}
 */

Screenshot.prototype.sslCertificatesPath = function (path) {
  this._sslCertificatesPath = path;
  return this;
};

/**
 * Set the SSL protocol to be used.
 *
 * Supported protocols:
 *
 *   - sslv3
 *   - sslv2
 *   - tlsv1
 *   - any
 *
 * @param {String} protocol
 * @return {Screenshot}
 */

Screenshot.prototype.sslProtocol = function (protocol) {
  this._sslProtocol = protocol;
  return this;
};

/**
 * Clip the screenshot to `width` by `height`.
 *
 * @return {Screenshot}
 */

Screenshot.prototype.clip = function (clip) {
  if (typeof clip === 'undefined') clip = true;
  this._clip = clip;
  return this;
};

/**
 * Capture the screenshot and call `fn` with `err` and `img`.
 *
 * @param {Function} fn
 */

Screenshot.prototype.capture = function (fn) {
  if (!fn) {
    var self = this;
    return function (fn) {
      self.capture(fn);
    };
  }

  var args = [];

  if (this._ignoreSslErrors) {
    args.push('--ignore-ssl-errors=true');
  }
  if (this._sslCertificatesPath) {
    args.push('--ssl-certificates-path=' + this._sslCertificatesPath);
  }
  if (this._sslProtocol) {
    args.push('--ssl-protocol=' + this._sslProtocol);
  }

  args.push(join(__dirname, '/script/render.js'), this.url,
  this._width, this._height, this._timeout, this._format, this._clip);

  var opts = {
    maxBuffer: Infinity
  };

  exec('phantomjs ' + args.join(' '), opts, function (err, stdout) {
    if (/Unable to load/.test(stdout)) return fn(new Error(stdout))
    fn(err, stdout && new Buffer(stdout, 'base64'));
  });
};
