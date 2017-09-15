'use strict'

const capture = require('.')
const fs = require('fs')

capture({ url: 'https://twitter.com/' }).then(imgs => {
  Object.keys(imgs).forEach(browser => {
    fs.writeFileSync(`${__dirname}/example-${browser}.png`, imgs[browser])
    console.log(`open example-${browser}.png`)
  })
})
