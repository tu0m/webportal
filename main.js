import './widgets/index.js' // load web component modules
import * as ui from './scripts/ui.js'
import * as storage from './scripts/storage.js'

const menuButton = document.querySelector('#menu-button')
const menuElement = document.querySelector('#menu')

function keyPressHandler(e) {
  switch (true) {
    case (e.key == 'Enter' || e.key == ' ' && e.target.nodeName == 'BUTTON'):
      ui.openMenu()
      menuButton.blur()
      break;
    case (e.key == 'Escape' && menuElement.classList.contains('open')):
      ui.closeMenu()
      break;
  }
}

function clickHandler(e) {
  switch (true) {
    case (e.target.id == 'menu-button'):
      ui.openMenu()
      break;
    case (e.target.id == 'menu-bg' && menuElement.classList.contains('open')):
      ui.closeMenu()
      break;
  }
}

// visual indication if browser is online
(function interval() {
  navigator.onLine
    ? document.body.style.filter = "none"
    : document.body.style.filter = "grayscale(100%)"

  setTimeout(interval, 5000)
})();

document.addEventListener('keydown', keyPressHandler)
document.addEventListener('mouseup', clickHandler)


ui.renderContent(storage.load())