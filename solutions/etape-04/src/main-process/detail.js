const {ipcMain, BrowserWindow} = require('electron')
const path = require('path')

let detailWindow
let selectedMeme

ipcMain.on('set-selected-meme', (e, i) => {
  selectedMeme = i
  const modalPath = path.join('file://', __dirname, '../windows/detail.html')
  detailWindow = new BrowserWindow({ width: 1000, height: 800 })
  detailWindow.on('closed', () => (detailWindow = null))
  detailWindow.loadURL(modalPath)
  detailWindow.show()
})

ipcMain.on('get-selected-meme', (e) => e.sender.send('selected-meme-sended', selectedMeme))
