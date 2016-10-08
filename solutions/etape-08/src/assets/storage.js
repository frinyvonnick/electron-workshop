const storage = require('electron-json-storage')
const path = require('path')

exports.addMeme = (memePath, callback) => {
  const memeName = path.basename(memePath)
  storage.get('memes', (error, data) => {
    if (error) throw error

    data.push({
      title: memeName,
      path: memePath
    })
    storage.set('memes', data, (error) => {
      if (error) throw error
      callback()
    })
  })
}

exports.deleteMeme = (selectedMeme, callback) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error

    storage.set('memes', memes.filter(meme => meme !== selectedMeme), (error) => {
      if (error) throw error

      callback()
    })
  })
}

const getMemes = (callback) => {
  storage.get('memes', (error, memes) => {
    if (error) throw error
    callback(memes)
  })
}
exports.getMemes = getMemes

exports.initWithDefaultsMemes = (defaultMemes) => {
  storage.set('memes', defaultMemes, (error) => {
    if (error) throw error
  })
}
