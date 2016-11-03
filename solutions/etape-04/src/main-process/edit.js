const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const { saveMeme } = require('../assets/storage')

let editWindow

exports.newEditWindow = (filePath) => {
  const modalPath = path.join('file://', __dirname, '../windows/edit.html#', encodeURIComponent(filePath))
  editWindow = new BrowserWindow({ width: 1000, height: 800 })
  editWindow.loadURL(modalPath)
  editWindow.show()
  editWindow.on('closed', () => { editWindow = null })
  return editWindow
}

ipcMain.on('save-meme', (e, { memePath, title, texts }) => {
  saveMeme(memePath, title, texts, () => {
    e.sender.send('meme-saved')
  })
})
