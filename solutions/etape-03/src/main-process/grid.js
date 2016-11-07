// TODO (Etape 5): Importer le module dialog de electron
const { ipcMain } = require('electron')
const { getMemes, deleteMeme } = require('../assets/storage.js')
const { newEditWindow } = require('./edit.js')
const fs = require('fs')

// TODO (Etape 4): Mettre en place un event handler pour l'évènement 'get-memes'
// Appeler la fonction getMemes pour récupérer la liste des memes fourni
// en premier paramètre du callback et renvoyer cette liste au demandeur

// TODO (Etape 5): Mettre en place un event handler pour l'évènement 'open-file-dialog'
// Utiliser la méthode showOpenDialog pour créer une nouvelle fenêtre de
// dialogue avec les options suivantes :
// - la propriété openFile
// - un filtre appelé Images avec les extensions jpg, png, gif
// Un paramètre contenant la liste des fichiers selectionnés vous est fourni
// en paramètre du callback.
// Utiliser la fonction newEditWindow pour créer une nouvelle fenêtre qui
// prend en paramètre le path d'un fichier.
// Mettre en place un event handler pour l'évènement 'closed' de cette
// nouvelle fenêtre et éxécuter l'instruction suivante dans son callback :
// getMemes(memes => event.sender.send('memes-sended', memes))

const saveDialog = (event, meme, window) => {
  const options = {
    title: 'Save the meme',
    defaultPath: process.env.HOME,
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    if (!filename) return
    const copyStream = fs.createReadStream(meme).pipe(fs.createWriteStream(filename))
    copyStream.on('finish', () => event.sender.send('saved-file-' + window, filename))
  })
}

ipcMain.on('save-from-grid', (event, meme) => saveDialog(event, meme, 'grid'))
ipcMain.on('save-from-detail', (event, meme) => saveDialog(event, meme, 'detail'))

ipcMain.on('delete-selected-meme', (e, selectedMeme) => {
  deleteMeme(selectedMeme, () => {
    e.sender.send('meme-deleted')
  })
})
