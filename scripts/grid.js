import * as widgets from '../widgets/index.js'
import * as storage from './storage.js'

const widgetGrid = document.querySelector('#widget-grid')

function renderContent(array = storage.load()) {
    if (!array) return
    const widgetGridItems = new DocumentFragment()

    array.forEach(object => {
        widgetGridItems.append(_createGridHtml(object))
    })

    widgetGrid.replaceChildren(widgetGridItems)
}

function _createGridHtml(object) {
    const htmlTag = document.createElement(widgets.getTag(object.type))

    // add default attributes
    for (let key in widgets.getAttributes(object.type)) {
        if (key.startsWith('data-')) continue
        // check if attribute value is a function and run it
        // this is mainly meant for UUID, so that every widget has unique value
        if (widgets.getAttributes(object.type)[key] instanceof Function) {
            htmlTag.setAttribute(key, widgets.getAttributes(object.type)[key]())
        } else {
            htmlTag.setAttribute(key, widgets.getAttributes(object.type)[key])
        }
    }

    // add user set attributes
    for (let key in object.attributes) {
        htmlTag.setAttribute(key, object.attributes[key])
    }

    return htmlTag
}






export { renderContent };
