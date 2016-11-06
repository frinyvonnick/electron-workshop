const {ipcRenderer, remote} = require('electron')
const {Menu, MenuItem} = remote

const img = document.getElementById('meme')

let menu = new Menu()
menu.append(new MenuItem({label: 'Save as', click (item, browserWindow) { ipcRenderer.send('save-from-detail', img.getAttribute('src')) }}))

// On envoit une demande de récupération d'informations sur le template selectionné
ipcRenderer.send('get-selected-meme', {})

// On receptionne les informations du template selectionné
ipcRenderer.on('selected-meme-sended', (e, i) => {
  img.setAttribute('src', i)
})

// Gère le menu contextuel sur un meme
img.addEventListener('contextmenu', e => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
})

// Action effectuée au click sur le bouton précédent
document.getElementById('previous').onclick = () => remote.getCurrentWindow().close()

ipcRenderer.on('saved-file-detail', function (event, path) {
  if (!path) path = 'No path'

  new Notification('Meme Generator', { // eslint-disable-line no-new
    body: `Le meme a été sauvegardé à l'emplacement ${path}`
  })
})
