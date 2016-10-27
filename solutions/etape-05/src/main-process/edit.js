const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const { saveMeme } = require('../assets/storage')

let editWindow
let sender

exports.newEditWindow = (filePath, initialSender) => {
	sender = initialSender
	const modalPath = path.join('file://', __dirname, '../windows/edit.html#', encodeURIComponent(filePath))
	editWindow = new BrowserWindow({ width: 1000, height: 800 })
	editWindow.loadURL(modalPath)
	editWindow.show()
	editWindow.on('closed', () => editWindow = null)
	return editWindow;
}

ipcMain.on('get-new-meme', (e) => e.sender.send('new-meme-sended', newMeme))

ipcMain.on('save-meme', (e, { memePath ,title, texts }) => {
  saveMeme(memePath, title, texts, () => {
    e.sender.send('meme-saved')
  })
})
