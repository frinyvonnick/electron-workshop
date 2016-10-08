const { remote } = require('electron')
const { setTextareasPosition, limitTextarea } = require('../assets/textareas')
const path = require('path')

const memePath = path.join('file://', decodeURIComponent(window.location.hash.slice(1)))

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
const img = editor.getElementsByTagName('img')[0]

// On receptionne les informations du template selectionné
img.onload = () => {
  setTextareasPosition(textareas, editor.getBoundingClientRect().width, img.getBoundingClientRect())
  // On initialise le contenu des textareas
  textareas.map((t, index) => {
    t.element.getElementsByTagName('textarea')[0].value = t.text
  })
}

img.setAttribute('src', memePath)

// Au resize de la fenêtre on repositionne les textareas
window.onresize = () => {
  setTextareasPosition(textareas, editor.getBoundingClientRect().width, img.getBoundingClientRect())
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
