const fs = require('fs')
const packager = require('electron-packager')

async function build(){
  let options = {
    name: 'Pi Scene Player',
    icon: './resources/pi.ico',
    dir: './',
    out: '../',
    overwrite: true
  }

  // Build package
  let appPaths = await packager(options)

  // Move Clips
  appPaths.forEach((path) => {
    fs.renameSync(`${path}/resources/app/clips`, `${path}/clips`)
  })

  console.log('Electron package created.')
}

build()
