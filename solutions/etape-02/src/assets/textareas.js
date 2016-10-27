const setTextareaPosition = (el, isTop, rect, containerWidth) => {
  el.style.height = `${rect.height / 4}px`
  el.getElementsByTagName('textarea')[0].style.fontSize = `${rect.height / 4 / 3}px`

  el.style.top = (isTop) ? `${rect.top}px` : `${rect.bottom - el.getBoundingClientRect().height}px`
  el.style.left = `${rect.left}px`
  el.style.right = `${containerWidth - (rect.left + rect.width)}px`
}
exports.setTextareaPosition = setTextareaPosition

exports.setTextareasPosition = (textareas, editorWidth, imageBoudingClientRect) => {
  textareas.map((t) => {
    setTextareaPosition(t.element, t.isTop, imageBoudingClientRect, editorWidth)
  })
}

const setTextareaRed = (textarea) => {
  textarea.style.color = 'red'
  setTimeout(function () {
    textarea.style.color = ''
  }, 500)
}

exports.limitTextarea = (textarea) => {
  const lines = textarea.value.split('\n')
  const maxLines = textarea.getAttribute('rows')
  const maxLengthPerLine = textarea.getAttribute('cols')

  for (let currentLineIndex = 0; currentLineIndex < lines.length; currentLineIndex++) {
    if (lines[currentLineIndex].length <= maxLengthPerLine) continue
    let currentCharacterIndex = 0
    let space = maxLengthPerLine
    while (currentCharacterIndex++ <= maxLengthPerLine) {
      if (lines[currentLineIndex].charAt(currentCharacterIndex) === ' ') space = currentCharacterIndex
    }
    lines[currentLineIndex + 1] = lines[currentLineIndex].substring(space + 1) + (lines[currentLineIndex + 1] || '')
    lines[currentLineIndex] = lines[currentLineIndex].substring(0, space)
  }

  if (lines.length > maxLines) {
    setTextareaRed(textarea)
  }
  textarea.value = lines.slice(0, maxLines).join('\n')
}
