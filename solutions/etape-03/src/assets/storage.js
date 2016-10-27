const storage = require('electron-json-storage')
const image = require('./image')
const path = require('path')

const addMeme = (title, memePath, callback) => {
  const memeName = path.basename(memePath)
  storage.get('memes', (error, data) => {
    if (error) throw error

    data.push({
      title: (title !== '') ? title : memeName,
      path: memePath
    })
    storage.set('memes', data, (error) => {
      if (error) throw error
      callback()
    })
  })
}

exports.addMeme = addMeme

exports.deleteMeme = (selectedMeme, callback) => {
  getMemes(memes => {
    storage.set('memes', memes.filter(meme => {
      return !(meme.title === selectedMeme.title && meme.path === selectedMeme.path)
    }), (error) => {
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

exports.saveMeme = (newMeme, title, texts, callback) => {
  getMemes((memes) => {
    image.saveimage(newMeme, texts, (memePath, error) => {
      if (error) throw error
      addMeme(title, memePath, (error) => {
        if (error) throw error
        callback()
      })
    })
  })
}
