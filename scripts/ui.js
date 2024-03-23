// menu UI stuff
// render loaded config to list html
// parse list html to saveable config
import * as widget from '../widgets/index.js'

const widgetGrid = document.querySelector('#widget-grid')
const widgetList = document.querySelector('#widget-list')
const menuBackdrop = document.querySelector('#menu-bg')
const menuElement = document.querySelector('#menu')

function renderContent(array) {
    widgetGrid.innerHTML = ''
    // widgetList.innerHTML = ''

    array.forEach(object => {
        ObjectToGrid(object)
        ObjectToList(object)
    })
}

function ObjectToGrid(object) {
    // find object's html tag
    let htmlTag = widget.htmlTag(object.type)

    // set attributes in the html
    for (let attribute in object.attributes) {
        htmlTag = htmlTag.replace(attribute, `${attribute}="${object.attributes[attribute]}"`)
    }

    // add to dom
    widgetGrid.innerHTML += htmlTag
}

function ObjectToList(object) {
    // render list item from object

    //   <li>
    //     <button id="move-button">↕︎</button>
    //     <span>Search</span>
    //     <select name="searchengines">
    //       <option>Google</option>
    //     </select>
    //     <button id="del-button">╳</button>
    //   </li>



}

function openMenu() {
    menuElement.removeEventListener('transitionend', _setHiddenAfterTransition);
    menuBackdrop.removeAttribute('hidden')
    // this forces reflow/repaint, allowing for css animation to work
    void (menuBackdrop.offsetWidth)
    menuElement.classList.add('open')
}

function closeMenu() {
    menuElement.addEventListener('transitionend', _setHiddenAfterTransition);
    menuElement.classList.remove('open')
}

function _setHiddenAfterTransition(e) {
    // https://cloudfour.com/thinks/transitioning-hidden-elements/
    if (e.target === menuElement) {
        menuBackdrop.setAttribute('hidden', true)
        menuElement.removeEventListener('transitionend', _setHiddenAfterTransition);
    }
}

// function _htmlToObject() {

// }

// function _ObjectToHtml() {

// }

// function add() {

// }

// function move() {
//     // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
// }

// function del() {

// }

export { renderContent, openMenu, closeMenu };
