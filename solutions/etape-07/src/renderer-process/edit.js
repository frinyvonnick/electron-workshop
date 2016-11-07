const { remote, ipcRenderer } = require('electron')
const { setTextareasPosition, limitTextarea } = require('../assets/textareas')
const { computeCoef, computeHeight } = require('../assets/compute')
const path = require('path')

const filePath = decodeURIComponent(window.location.hash.slice(1))
const memePath = path.join('file://', filePath)

// Tableau contenant les informations relatives aux deux textareas
const textareas = [
  {
    element: document.getElementsByClassName('top')[0],
    isTop: true,
    text: 'Insert text here'
  },
  {
    element: document.getElementsByClassName('bottom')[0],
    isTop: false,
    text: 'Insert text here'
  }
]

// Le conteneur parent de l'image et des textareas
const editor = document.getElementsByClassName('editor')[0]
const wrapper = document.getElementById('wrapper')
const img = editor.getElementsByTagName('img')[0]

// On receptionne les informations du template selectionné
img.onload = () => {
  let wrapperRect = wrapper.getBoundingClientRect()

  // On va cropper l'image pour qu'elle rentre dans le format d'image choisi
  // On calcule la hauteur du wrapper par rapport à sa largeur
  const wrapperHeight = parseInt(computeHeight(wrapperRect.width, computeCoef(16, 9)), 10)
  wrapper.style.height = wrapperHeight + 'px'
  wrapperRect = wrapper.getBoundingClientRect()
  // On centre l'image verticalement dans le wrapper
  img.style.top = parseInt((wrapperRect.height - img.getBoundingClientRect().height) / 2, 10) + 'px'

  setTextareasPosition(textareas, editor.getBoundingClientRect().width, wrapper.getBoundingClientRect())
  // On initialise le contenu des textareas
  textareas.map((t, index) => {
    t.element.getElementsByTagName('textarea')[0].value = t.text
  })
}

img.setAttribute('src', memePath)

// Au resize de la fenêtre on repositionne les textareas
window.onresize = () => {
  setTextareasPosition(textareas, editor.getBoundingClientRect().width, wrapper.getBoundingClientRect())
}

window.onload = () => {
  // Fix pour focus le premier textarea
  setTimeout(() => {
    textareas[0].element.getElementsByTagName('textarea')[0].focus()
  }, 50)
}

textareas.map((t) => {
  // On limite le nombre de ligne et de caractères dans les textareas
  t.element.onkeyup = e => {
    limitTextarea(e.srcElement)
    t.text = e.srcElement.value
  }
})

// Action effectuée au click sur le bouton précédent
document.getElementById('previous').onclick = () => remote.getCurrentWindow().close()

// Action effectuée au click sur le bouton save
document.getElementById('save').onclick = () => {
  ipcRenderer.send('save-meme', {
    memePath: filePath,
    title: document.getElementById('title').value,
    texts: textareas.map((t) => {
      return {
        isTop: t.isTop,
        text: t.text
      }
    })
  })
}

// On ferme la fenêtre quand le meme est saved
ipcRenderer.on('meme-saved', () => {
  new Notification('Meme Generator', { // eslint-disable-line no-new
    body: 'Le meme a bien été sauvegardé'
  })

  setTimeout(() => {
    remote.getCurrentWindow().close()
  }, 100)
})
