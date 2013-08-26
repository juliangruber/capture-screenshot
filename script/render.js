
/**
 * Module dependencies.
 */

var webpage = require('webpage');
var args = require('system').args;
var noop = function() {};

/**
 * Script arguments.
 */

var url = args[1];
var width = args[2];
var height = args[3];
var timeout = args[4];
var format = args[5];

/**
 * Initialize page.
 */

var page = webpage.create();
page.viewportSize = {
  width: width,
  height: height
};

/**
 * Silence phantomjs.
 */

page.onConsoleMessage =
page.onConfirm = 
page.onPrompt =
page.onError = noop;

/**
 * Open and render page as base64:image/png.
 */

page.open(url, function (status) {
  if (status !== 'success') throw new Error('Unable to load');
  window.setTimeout(function () {
    page.evaluate(function() {
      if (!document.body.style.background) {
        document.body.style.backgroundColor = 'white';
      }
    });
    console.log(page.renderBase64(format));
    phantom.exit();
  }, timeout);
});

