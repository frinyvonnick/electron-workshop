const {BrowserWindow, ipcMain} = require('electron')
const path = require('path')

exports.newComputeWindow = (calls) => {
  const modalPath = path.join('file://', __dirname, '../windows/compute.html')
  let computeWindow = new BrowserWindow({ show: false })
  computeWindow.on('closed', () => (computeWindow = null))
  computeWindow.loadURL(modalPath)

  if (Array.isArray(calls)) {
    calls.map((call) => {
      ipcMain.once(call.eventName, e => {
        e.sender.send(call.eventName, call.options)
      })
    })
  }

  return computeWindow
}
