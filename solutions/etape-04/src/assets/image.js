const {app, ipcMain} = require('electron')
const path = require('path')
const memesPath = app.getPath('userData') + '/memes/'
const Jimp = require('jimp')
const {computeCoef, computeHeight} = require('../assets/compute')
const {newComputeWindow} = require('../main-process/compute')

exports.saveimage = (file, texts, cb) => {
  Jimp.read(file).then((image) => {
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
      if (Array.isArray(texts) && texts.length === 2) {
        const coef = computeCoef(image.bitmap.width, image.bitmap.height)
        const fontSize = 32
        const lineHeight = 1.5
        const margin = fontSize / 2
        // Format 16/9
        const dWidth = 1024
        const dHeigth = 576
        const oHeight = computeHeight(dWidth, coef)

        // On crop l'image dans sa taille dans sa taille finale
        image.resize(dWidth, Jimp.AUTO)
        image.crop(0, parseInt((oHeight - dHeigth) / 2, 10), dWidth, dHeigth)

        // On ouvre une nouvelle fenètre invisible pour calculer la taille
        // des textes en pixels
        let computeWindow = newComputeWindow([{
          eventName: 'compute-texts-width',
          options: {texts: texts}
        }])

        ipcMain.once('texts-width-computed', (e, texts) => {
          const computeX = (cW, w) => parseInt((cW - w) / 2, 10)
          // On positionne le texte saisi par l'utilisateur
          texts.map(text => {
            if (text.isTop) {
              text.chunks.map((chunk, index) => {
                image.print(
                  font,
                  computeX(dWidth, chunk.width),
                  (index * lineHeight * fontSize) + margin,
                  chunk.content
                )
              })
            } else {
              for (var index = 0, y = text.chunks.length; index < text.chunks.length; index++, y--) {
                const chunk = text.chunks[index]
                image.print(
                  font,
                  computeX(dWidth, chunk.width),
                  (dHeigth - y * lineHeight * fontSize) - margin,
                  chunk.content
                )
              }
            }
          })

          const memePath = path.join(memesPath, Date.now() + '-' + path.basename(file))
          image.write(memePath, () => {
            computeWindow.close()
            cb(memePath)
          })
        })
      }
    })
  }).catch((err) => {
    cb(null, err)
  })
}

exports.getImageInfos = (file, cb) => {
  Jimp.read(file).then((image) => {
    cb({
      width: image.bitmap.width,
      height: image.bitmap.height
    })
  })
}
