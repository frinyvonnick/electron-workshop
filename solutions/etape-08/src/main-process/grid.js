const { ipcMain, BrowserWindow, dialog } = require('electron')
const { getMemes } = require('../assets/storage.js')
const path = require('path')

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
      const modalPath = path.join('file://', __dirname, '../windows/edit.html#', encodeURIComponent(files[0]))
      let editWindow = new BrowserWindow({ width: 1000, height: 800 })
      editWindow.on('closed', () => (editWindow = null))
      editWindow.loadURL(modalPath)
      editWindow.show()
    }
  })
})
