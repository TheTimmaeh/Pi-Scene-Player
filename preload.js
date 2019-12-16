const fs = require('fs')

const clips = {}

fs.readdirSync('./clips/').filter((f) => f.endsWith('.mp4')).forEach((f) => {
  let parts = /(\d+)-(.+?)-(\d+)-(\d+)\.mp4/.exec(f)

  if(!clips[parts[2]]) clips[parts[2]] = {}
  clips[parts[2]][parts[4]] = {shot: parts[1], file: parts[0]}
})

window.clips = clips
