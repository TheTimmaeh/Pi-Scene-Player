const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

let mainWindow

function createWindow(){
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    icon: 'resources/pi.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.maximize()
  mainWindow.removeMenu()

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(mainWindow === null) createWindow()
})
