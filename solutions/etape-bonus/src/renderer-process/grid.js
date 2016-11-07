const { remote, ipcRenderer } = require('electron')
const { Menu, MenuItem } = remote

ipcRenderer.send('get-memes')

ipcRenderer.on('memes-sended', (e, images) => {
  document.getElementById('content').innerHTML = images.reduce((prev, next, index) => {
    return `${prev}
    <div class="card meme" data-index="${index}">
    <div class="img" style="background-image:url('${next.path.split('\\').join('\\\\')}')"></div>
    <h3 title="${next.title}"><span>${next.title}</span></h3>
    </div>`
  }, '')

  document.getElementById('content').innerHTML += `<div class="card" id="new-meme">
  <div class="img"></div>
  <h3><span>New</span></h3>
  </div>`

  document.getElementById('new-meme').addEventListener('click', () => ipcRenderer.send('open-file-dialog'))

  const elements = document.getElementsByClassName('meme')
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]

    // Gère le menu contextuel sur un meme
    element.addEventListener('contextmenu', e => {
      e.preventDefault()
      let menu = new Menu()
      menu.append(new MenuItem({label: 'Save as', click (item, browserWindow) { ipcRenderer.send('save-from-grid', images[parseInt(element.getAttribute('data-index'), 10)].path) }}))
      menu.append(new MenuItem({label: 'Delete', click (item, browserWindow) { ipcRenderer.send('delete-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)]) }}))
      menu.popup(remote.getCurrentWindow())
    })

    // Gère l'ouverture de la fenètre de détails
    element.addEventListener('click', e => {
      ipcRenderer.send('set-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)].path)
    })
  }
})

ipcRenderer.on('meme-deleted', () => {
  ipcRenderer.send('get-memes', {})

  new Notification('Meme Generator', { // eslint-disable-line no-new
    body: 'Le meme a bien été supprimé'
  })
})

ipcRenderer.on('saved-file-grid', function (event, path) {
  if (!path) path = 'No path'
  new Notification('Meme Generator', { // eslint-disable-line no-new
    body: `Le meme a été sauvegardé à l'emplacement ${path}`
  })
})
