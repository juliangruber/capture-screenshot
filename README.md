# url-to-screenshot

Capture screenshots using [phantomjs](http://phantomjs.org/).

[![build status](https://secure.travis-ci.org/juliangruber/url-to-screenshot.png)](http://travis-ci.org/juliangruber/url-to-screenshot)

## Example

Capture a `800x600` screenshot of [ghub.io](http://ghub.io):

```js
var screenshot = require('url-to-screenshot');
var fs = require('fs');

screenshot('http://ghub.io/')
  .width(800)
  .height(600)
  .capture(function(err, img) {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/example.png', img);
    console.log('open example.png');
  });
```

![ghub.io](https://raw.github.com/juliangruber/url-to-screenshot/master/example.png)

## Clipped Example

Capture a clipped `320x320` screenshot of [ghub.io](http://ghub.io):

```js
var screenshot = require('url-to-screenshot');
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
```

![ghub.io](https://raw.github.com/juliangruber/url-to-screenshot/master/example-clipped.png)

## API

### Screenshot(url[, opts])

Create a screenshot object for `url`.

Use `opts` if passing arguments this way is more convenient than using the api,
e.g.:

```js
var s = Screenshot('http://google.com', { width: 800 })
// is the same as
var s = Screenshot('http://google.com').width(800);
```

### Screenshot#width(width)

Set the screenshot's width in pixel. Defaults to `1024`.

### Screenshot#height(height)

Set the screenshot's height in pixel. Defaults to `768`.

### Screenshot#clip()

Set the screenshot's [`clipRect`](http://phantomjs.org/api/webpage/property/clip-rect.html) to:
```js
{
  top: 0,
  left: 0,
  width: s.width
  height: s.height
}
```

### Screenshot#format(format)

Set the output format. Supported formats:

* `jpg`, `jpeg`
* `png`
* `gif`

Defaults to `png`.

### Screenshot#timeout(timeout)

After loading the page, make phantomjs wait for `timeout` milliseconds before 
taking the screenshot. Defaults to `0` ms.

### Screenshot#ignoreSslErrors()

Make PhantomJS ignore invalid ssl certificates.

### Screenshot#sslCertificatesPath(values)

Set the path of the ssl certificates PhantomJS should use.

### Screenshot#sslProtocol(values)

Override the default ssl protocol, `sslv3`.

Supported protocols:

* sslv3
* sslv2
* tlsv1
* any

### Screenshot#capture([fn])

Capture the screenshot and call `fn` with the possible error and a `Buffer`
containing the image.

If no `fn` is provided, a thunk/continuable is returned.

If the page has a transparent background, it will be set to `white` before
capturing.

## Installation

Make sure you have a working installation of 
[phantomjs](http://phantomjs.org/) in your `$PATH`.

With [npm](https://npmjs.org) do:

```bash
npm install url-to-screenshot
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
