# capture-screenshot

Capture screenshots in multiple browsers.

[![build status](https://secure.travis-ci.org/juliangruber/capture-screenshot.png)](http://travis-ci.org/juliangruber/capture-screenshot)

## Browsers

- [X] Electron
- [X] PhantomJS
- [ ] Chrome Headless
- [ ] Firefox Headless

## Usage

Capture `1024x768` screenshots of `https://twitter.com/` in Electron and PhantomJS:

```js
const capture = require('capture-screenshot')
const fs = require('fs')

capture({ url: 'https://twitter.com/' })
  .then(imgs => {
    fs.writeFileSync('electron.png', imgs.electron)
    fs.writeFileSync('phantomjs.png', imgs.phantomjs)
  })
```

| Electron | PhantomJS |
|---|---|
| <img alt="electron" src="https://raw.github.com/juliangruber/capture-screenshot/master/example-electron.png" width=400 /> | <img alt="phantomjs" src="https://raw.github.com/juliangruber/capture-screenshot/master/example-phantomjs.png" width=400 /> |

## API

### capture({ url, browsers = ['electron', 'phantomjs'], width = 1024, height = 768, format = 'png' })

Capture a screenshot of `url`, returns a `Promise` which resolves with an Object ob Buffers.

Options:

- `url` Page url
- `browsers` The browsers to test
- `width` Viewport width
- `height` Viewport height
- `format` File format (`png`, `jpg`)

## Installation

```bash
$ npm install capture-screenshot
```

## CI

If you use the `electron` browser, this project requires an `xvfb` setup to be running in your CI environment.
For an example how to set one up, check out the [.travis.yml](https://github.com/juliangruber/capture-screenshot/blob/master/.travis.yml).
After that, no further setup is required however, as all the executables are
installed automatically.

## Related projects

- __[capture-electron](https://github.com/juliangruber/capture-electron)__ &mdash; Capture screenshots using Electron
- __[capture-phantomjs](https://github.com/juliangruber/capture-phantomjs)__ &mdash; Capture screenshots using PhantomJS

## License

MIT

Copyright (c) 2017 Julian Gruber &lt;julian@juliangruber.com&gt;

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
