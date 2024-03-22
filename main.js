import './widgets/index.js'
import { Widgets } from './widgets/index.js'

const menuButton = document.querySelector('#menu-button')
const menuBackdrop = document.querySelector('#menu-bg')
const menuElement = document.querySelector('#menu')

const keyPressHandler = (e) => {
  console.log(e)

  switch (true) {
    case (e.key == 'Enter' || e.key == ' ' && e.target.nodeName == 'BUTTON'):
      menu.open()
      menuButton.blur()
      break;
    case (e.key == 'Escape' && menuElement.classList.contains('open')):
      menu.close()
      break;
  }
}

const clickHandler = (e) => {
  console.log(e)

  switch (true) {
    case (e.target.id == 'menu-button'):
      menu.open()
      break;
    case (e.target.id == 'menu-bg' && menuElement.classList.contains('open')):
      menu.close()
      break;
  }
}

const menu = {
  open() {
    menuElement.removeEventListener('transitionend', this.setHiddenAfterTransition);
    menuBackdrop.removeAttribute('hidden')
    // this forces reflow/repaint, allowing for css animation to work
    void (menuBackdrop.offsetWidth)
    menuElement.classList.add('open')

    // load config

  },

  get opened() {

  },

  close() {
    // save config
    // remove eventlisteners

    // https://cloudfour.com/thinks/transitioning-hidden-elements/
    menuElement.addEventListener('transitionend', this.setHiddenAfterTransition);
    menuElement.classList.remove('open')
  },

  setHiddenAfterTransition(e) {
    if (e.target === menuElement) {
      menuBackdrop.setAttribute('hidden', true)
      menuElement.removeEventListener('transitionend', this.setHiddenAfterTransition);
    }
  },

  add() {

  },

  move() {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
  },

  delete() {

  },
}


const widget = {
  get types() {
    return Widgets.map(item => item.type)
  },

  attributes(widgetType) {
    return Widgets.find(item => item.type == widgetType).attributes
  },

  htmlTag(widgetType, widgetAttributes) {
    let tag = Widgets.find(item => item.type == widgetType).tag
    const attributeNames = Widgets.find(item => item.type == widgetType).attributes
    const attributeValues = widgetAttributes

    if (!Object.keys(attributeNames).every(key => Object.keys(attributeValues).includes(key))) return null


    for (let attributeName in attributeNames) {
      tag = tag.replace(attributeName, `${attributeName}="${attributeValues[attributeName]}"`)
    }
    console.log(tag)

    return tag

  },
}


const config = {
  get load() {
    // return localStorage
    // if empty, return default
    return this.defaultConfig
  },

  save(content) {
    // discard invalid elements (empty inputs)
    // save to localStorage
  },

  get defaultConfig() {
    return widget.htmlTag('Search', { 'searchengine': 'Google' })
  }
}

const grid = {
  update(content = config.load) {
    document.querySelector('#widget-grid').innerHTML = content
  },
};

// visual indication if browser is online
(function interval() {
  navigator.onLine
    ? document.body.style.filter = "none"
    : document.body.style.filter = "grayscale(100%)"

  setTimeout(interval, 5000)
})()

grid.update()
document.addEventListener('keydown', keyPressHandler)
document.addEventListener('mouseup', clickHandler)