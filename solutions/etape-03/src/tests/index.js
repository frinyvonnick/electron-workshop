'use strict'

const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const describe = global.describe
const it = global.it
const before = global.before
const after = global.after
const path = require('path')

chai.should()
chai.use(chaiAsPromised)

describe('Meme generator', function () {
  let app

  const setupApp = function (app) {
    chaiAsPromised.transferPromiseness = app.transferPromiseness
    return app.client.waitUntilWindowLoaded()
  }

  const startApp = function () {
    let electronPath = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron')
    if (process.platform === 'win32') electronPath += '.cmd'

    app = new Application({
      path: electronPath,
      args: [
        path.join(__dirname, '..', '..')
      ],
      waitTimeout: 10000
    })

    return app.start().then(setupApp)
  }

  before(function () {
    return startApp()
  })

  after(function () {
    if (app && app.isRunning()) {
      return app.stop()
    }
  })

  it('opens only one window', function () {
    // TODO (Etape Bonus): implementer le test qui vérifie que l'application n'ouvre qu'une fenêtre au lancement
    return chai.expect(false).to.be.ok
  })

  it('opens a window with "Electron meme generator" title', function () {
    // TODO (Etape Bonus): implementer le test qui vérifie que l'application n'ouvre qu'une fenêtre au lancement
    return chai.expect(false).to.be.ok
  })

  it('opens a window with the right size', function () {
    // TODO (Etape Bonus): implementer le test qui vérifie que l'application n'ouvre qu'une fenêtre au lancement
    return chai.expect(false).to.be.ok
  })

  it('displays the list of memes', function () {
    // TODO (Etape Bonus): implementer le test qui vérifie que l'application n'ouvre qu'une fenêtre au lancement
    return chai.expect(false).to.be.ok
  })
})
