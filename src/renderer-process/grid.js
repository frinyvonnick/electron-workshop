const { ipcRenderer } = require('electron')
// TODO (Etape 6): Importer remote depuis electron
// TODO (Etape 6): Importer Menu et MenuItem depuis le module remote
const path = require('path')

// TODO (Etape 4): Utiliser l'ipcRenderer pour demander la liste des memes
// avec le message 'get-memes'

const images = [
  {
    title: 'Victory Baby',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'baby.jpg')
  },
  {
    title: 'Creepy Condescending Wonka',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'chapelier.jpg')
  },
  {
    title: 'Futurama Fry',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'futurama.jpg')
  },
  {
    title: 'Grandma Finds The Internet',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'grandma.jpg')
  },
  {
    title: 'Picard Wtf',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'startrek.png')
  },
  {
    title: 'X, X Everywhere',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'toystory.png')
  },
  {
    title: 'Liam Neeson Taken',
    path: path.join('file://', __dirname, '..', 'assets', 'img', 'defaults', 'taken.jpg')
  }
]

// TODO (Etape 4): Déplacer le rendu de la galerie dans le callback du
// message 'memes-sended'
document.getElementById('content').innerHTML = images.reduce((prev, next, index) => {
  return `${prev}
	<div class="card meme" data-index="${index}">
	<div class="img" style="background-image:url('${next.path.split('\\').join('\\\\')}')"></div>
	<h3 title="${next.title}"><span>${next.title}</span></h3>
	</div>`
}, '')

ipcRenderer.on('memes-sended', (e, images) => {
  document.getElementById('content').innerHTML += `<div class="card" id="new-meme">
	<div class="img"></div>
	<h3><span>New</span></h3>
	</div>`

  // TODO (Etape 5): Mettre en place l'event listener 'click' sur l'élément
  // HTML id 'new-meme' qui va émettre l'évènement 'open-file-dialog' avec l'IPC

  const elements = document.getElementsByClassName('meme')
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]

    // TODO (Etape 6): Mettre en place l'event listener 'contextmenu'.
    // N'oubliez pas de prévenir l'évènement par défaut
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
