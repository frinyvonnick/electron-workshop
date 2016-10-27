// TODO (Etape 1): importer les modules app et BrowserWindow de electron
const glob = require('glob')
// TODO (Etape 1): importer le module path
const { getMemes, initWithDefaultsMemes } = require('./assets/storage')
const { copyDefaultsMemesFiles } = require('./assets/initMemesDirectory')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

app.on('ready', () => {
  // Create the browser window.
  // TODO (Etape 2): Essayez :
  // - Changer la taille de la fenêtre
  // - Enlever les bordures
  // - Ouvrir les devtools au démarrage
	// TODO (Etape 1): Instancier une nouvelle instance de BrowserWindow

  // and load the index.html of the app.
  // TODO (Etape 3): Changer le fichier html cible par index.html
  // TODO (Etape 1): Charger le fichier ./windows/hello.html avec le module path

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
