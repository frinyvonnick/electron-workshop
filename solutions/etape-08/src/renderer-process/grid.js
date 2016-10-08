const { ipcRenderer } = require('electron')
const path = require('path')

ipcRenderer.send('get-memes')

ipcRenderer.on('memes-sended', (e, images) => {
  document.getElementById('content').innerHTML = images.reduce((prev, next, index) => {
    return `${prev}
    <div class="card meme" data-index="${index}">
    <div class="img" style="background-image:url('${path.join('file://', next.path)}')"></div>
    <h3 title="${next.title}"><span>${next.title}</span></h3>
    </div>`
  }, '')

  document.getElementById('content').innerHTML += `<div class="card" id="new-meme">
  <div class="img"></div>
  <h3><span>New</span></h3>
  </div>`

  document.getElementById('new-meme').addEventListener('click', () => ipcRenderer.send('open-file-dialog'))
})
