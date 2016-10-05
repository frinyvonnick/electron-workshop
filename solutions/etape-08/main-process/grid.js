const { ipcMain } = require('electron')

const defaultMemes = [
  {
    title: 'Victory Baby',
    file: 'baby.jpg'
  },
  {
    title: 'Creepy Condescending Wonka',
    file: 'chapelier.jpg'
  },
  {
    title: 'Futurama Fry',
    file: 'futurama.jpg'
  },
  {
    title: 'Grandma Finds The Internet',
    file: 'grandma.jpg'
  },
  {
    title: 'Picard Wtf',
    file: 'startrek.png'
  },
  {
    title: 'X, X Everywhere',
    file: 'toystory.png'
  },
  {
    title: 'Liam Neeson Taken',
    file: 'taken.jpg'
  }
]

ipcMain.on('get-memes', (e) => {
  e.sender.send('memes-sended', defaultMemes)
})
