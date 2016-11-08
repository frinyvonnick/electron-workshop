const { ipcRenderer } = require('electron')
// TODO (Etape 6): Importer remote depuis electron
// TODO (Etape 6): Importer Menu et MenuItem depuis le module remote

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

    // TODO (Etape 6): Mettre en place l'event listener 'contextmenu'.
    // N'oubliez pas d'empêcher l'évènement par défaut
    // Dans le callback de l'event listener, instancier un nouvel objet de type Menu

    // A l'aide de la méthode append de l'objet menu ajouter des nouvelles instances de MenuItem
    // Un premier élement Save as qui au click appelle l'instruction suivante :
    // ipcRenderer.send('save-from-grid', images[parseInt(element.getAttribute('data-index'), 10)].path)
    // Un premier élement Delete qui au click appelle l'instruction suivante :
    // ipcRenderer.send('delete-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)])

    // Puis rattacher le menu à la fenêtre courante grâce à la méthode popup

    // Gère l'ouverture de la fenètre de détails
    element.addEventListener('click', e => {
      ipcRenderer.send('set-selected-meme', images[parseInt(element.getAttribute('data-index'), 10)].path)
    })
  }
})

ipcRenderer.on('meme-deleted', () => {
  ipcRenderer.send('get-memes', {})

// TODO (Etape 7): Faites une notification qui informe l'utilisateur
// que le meme a bien été supprimé
})

ipcRenderer.on('saved-file-grid', function (event, path) {
  if (!path) path = 'No path'

// TODO (Etape 7): Faites une notification qui informe l'utilisateur
// que le meme a bien été sauvegardé à l'emplacement
// contenu dans la varialbe path
})
