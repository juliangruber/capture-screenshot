'use strict'

const capture = {
  chrome: require('capture-chrome'),
  electron: require('capture-electron'),
  phantomjs: require('capture-phantomjs')
}

module.exports = async opts => {
  const browsers = opts.browsers || Object.keys(capture)
  const bufs = await Promise.all(
    browsers.map(browser => capture[browser](opts))
  )
  return bufs.reduce((acc, buf, i) => {
    acc[browsers[i]] = buf
    return acc
  }, {})
}
