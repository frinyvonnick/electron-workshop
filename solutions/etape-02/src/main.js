const { app, BrowserWindow } = require('electron')
const glob = require('glob')
const path = require('path')
const { getMemes, initWithDefaultsMemes } = require('./assets/storage')
const { copyDefaultsMemesFiles } = require('./assets/initMemesDirectory')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 800 })

  // and load the index.html of the app.
  // TODO (Etape 3): Changer le fichier html cible par index.html
  mainWindow.loadURL(path.join('file://', __dirname, 'windows/hello.html'))

  // Hot reload
  if (/--debug/.test(process.argv.join(' '))) {
    const { client } = require('electron-connect')
    client.create(mainWindow)
  }
})

// Kill app if all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('will-finish-launching', () => {
  // init database with defaults memes located in assets/img/defaults
  getMemes(memes => {
    if (Object.keys(memes).length === 0 && memes.constructor === Object) {
      copyDefaultsMemesFiles((defaultMemes) => {
        initWithDefaultsMemes(defaultMemes)
      })
    }
  })
})

// Load scripts of main process
glob.sync(path.join(__dirname, 'main-process/**/*.js')).forEach(function (file) {
  require(file)
})
