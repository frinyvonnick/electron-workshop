const { app } = require('electron')
const fs = require('fs')
const path = require('path')
const memesPath = app.getPath('userData') + '/memes/'

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

const copyDefaultsMemesFiles = (callback) => {
  fs.mkdir(memesPath, () => defaultMemes.forEach(copyMeme))
  callback(defaultMemes.map(meme => ({title: meme.title, path: path.join(memesPath, meme.file)})))
}

const copyMeme = (meme) => {
  fs.createReadStream(app.getAppPath() + '/src/assets/img/defaults/' + meme.file).pipe(fs.createWriteStream(memesPath + meme.file))
}

exports.copyDefaultsMemesFiles = copyDefaultsMemesFiles
