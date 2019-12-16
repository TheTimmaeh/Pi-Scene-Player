let video = document.querySelector('#clip')

let info = {
  shot: document.querySelector('#shot'),
  location: document.querySelector('#location'),
  status: document.querySelector('#status'),
  duration: document.querySelector('#duration'),
  progress: document.querySelector('#progress'),
}

let controls = {
  ctop: document.querySelector('#ctop'),
  cright: document.querySelector('#cright'),
  cbottom: document.querySelector('#cbottom'),
  cleft: document.querySelector('#cleft'),
  ccenter: document.querySelector('#ccenter'),
}

let menu = document.querySelector('#menu'),
    close = document.querySelector('#close')

let playbackAdjustment = 0.1

let current = {
  location: null,
  shot: null,
  i: null
}

// Video loading
video.onloadedmetadata = () => {
  info.duration.innerText = video.duration.toFixed(1)
}

setInterval(() => {
  info.progress.innerText = video.currentTime.toFixed(1)
}, 50)

// Playback Rate Adjustment
let normalAnnounced = false
ctop.onclick = () => {
  if(video.playbackRate < 1){
    video.playbackRate = (video.playbackRate + playbackAdjustment).toFixed(1)
    if(video.playbackRate == 1){
      if(!normalAnnounced){
        setStatus('<span class="mono">1.0</span>x <i class="fad fa-dog fa-swap-opacity"></i>')
        normalAnnounced = true
      }
    } else {
      setStatus(`<span class="mono">${video.playbackRate}</span>x <i class="fad fa-rabbit-fast"></i>`)
    }
  }
}

cbottom.onclick = () => {
  if((video.playbackRate - playbackAdjustment).toFixed(1) > 0){
    video.playbackRate = (video.playbackRate - playbackAdjustment).toFixed(1)
    setStatus(`<span class="mono">${video.playbackRate}</span>x <i class="fad fa-turtle"></i>`)
    normalAnnounced = false
  }
}

// Previous/Next Clip
cleft.onclick = () => {
  if(!current.location) return

  setStatus('Previous Clip')

  playShot(current.location, Object.values(clips[current.location])[(current.shotIndex < 1 ? Object.values(clips[current.location]).length - 1 : current.shotIndex - 1)].shot)
}

cright.onclick = () => {
  if(!current.location) return

  setStatus('Next Clip')

  playShot(current.location, Object.values(clips[current.location])[(current.shotIndex + 1 >= Object.values(clips[current.location]).length ? 0 : current.shotIndex + 1)].shot)
}

// Menu
ccenter.onclick = () => {
  document.body.className = 'menuOpen'
  if(current.location) video.pause()
}

close.onclick = () => {
  document.body.className = ''
  if(current.location) video.play()
}

// Set status message
const setStatus = (text) => {
  let message = document.createElement('div')
  message.innerHTML = text
  info.status.appendChild(message)

  setTimeout(() => {
    message.className = 'hidden'

    setTimeout(() => {
      info.status.removeChild(message)
    }, 300)
  }, 400)
}


// Test
const playShot = (l, s) => {
  let shotIndex = Object.values(clips[l]).findIndex((c) => c.shot == s)
  if(typeof shotIndex == 'undefined') return

  current.location = l
  current.shot = Object.values(clips[l])[shotIndex].shot
  current.shotIndex = shotIndex

  info.location.innerText = l
  info.shot.innerText = s

  document.body.className = ''
  document.querySelectorAll('#selection > div').forEach((e) => e.style.display = 'none')

  video.querySelector('source').src = `../../clips/${Object.values(clips[l])[shotIndex].file}`
  video.load()
  video.play()
}

const selection = document.querySelector('#selection')
Object.keys(clips).forEach((l) => {

  // Location
  let location = document.createElement('h2')
  location.innerHTML = `${l} <small>${Object.values(clips[l]).length} Shots</small>`
  selection.appendChild(location)

  let shotlist = document.createElement('div')
  shotlist.style.display = 'none'
  selection.appendChild(shotlist)

  // Shots of Location
  //Object.values(clips[location]).forEach((s) => {
  for(let s in Object.values(clips[l])){
    let shot = document.createElement('div')
    shot.style.backgroundImage = `url(${(!Object.values(clips[l])[s].thumb ? 'resources/img/nothumb.png' : `../../clips/thumbnails/${Object.values(clips[l])[s].thumb}`)})`
    shot.innerHTML = `<div class="count">${1+parseInt(s)}</div><div class="shot"><i class="fad fa-film-alt"></i> ${Object.values(clips[l])[s].shot}</div>`
    shot.onclick = () => {
      playShot(l, Object.values(clips[l])[s].shot)
    }
    shotlist.appendChild(shot)
  }

  location.onclick = () => {
    if(shotlist.style.display == 'none') shotlist.style.display = 'block'
    else shotlist.style.display = 'none'
  }
})
