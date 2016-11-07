exports.computeCoef = (width, height) => height / width

exports.computeHeight = (width, coef) => coef * width

exports.computeWidth = (height, coef) => height / coef

exports.computeFont = (destWidth, width) => parseInt(width / destWidth * 32, 10)

exports.computeTextWidth = (text, font, size) => {
  const c = document.createElement('canvas')
  const ctx = c.getContext('2d')
  ctx.font = size + 'px ' + font
  return ctx.measureText(text).width
}
