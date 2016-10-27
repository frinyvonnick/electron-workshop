const { ipcMain, dialog } = require('electron')
const { getMemes, deleteMeme } = require('../assets/storage.js')
const { newEditWindow } = require('./edit.js')
const fs = require('fs')

ipcMain.on('get-memes', (e) => {
  getMemes(memes => {
    e.sender.send('memes-sended', memes)
  })
})

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
  }, (files) => {
    if (files) {
      const editWindow = newEditWindow(files[0])
      editWindow.on('closed', () => {
        getMemes(memes => {
          event.sender.send('memes-sended', memes)
        })
      })
    }
  })
})

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
