const { ipcRenderer } = require('electron')
const { computeTextWidth } = require('../assets/compute')

ipcRenderer.send('compute-texts-width', {})

ipcRenderer.on('compute-texts-width', (e, opt) => {
  const fontSize = 32
  const characterPerLine = 40
  const prepareChunk = (chunk) => {
    return {
      content: chunk,
      width: computeTextWidth(chunk, 'Arial', fontSize)
    }
  }

  ipcRenderer.send('texts-width-computed', opt.texts.map((t) => {
    let chunks

    if ((t.text.match(/\n/g) || []).length > 0) {
      chunks = t.text.split('\n').map(prepareChunk)
    } else {
      chunks = [t.text.substring(0, characterPerLine), t.text.substring(characterPerLine)].map(prepareChunk)
    }

    return {
      isTop: t.isTop,
      chunks: chunks
    }
  }))
})
