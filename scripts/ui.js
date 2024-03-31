import * as widgets from '../widgets/index.js'
import * as storage from '../scripts/storage.js'

const widgetGrid = document.querySelector('#widget-grid')

function renderContent(array = storage.load()) {
    if (!array) return
    const widgetGridItems = new DocumentFragment()

    array.forEach(object => {
        widgetGridItems.append(_createGridHtml(object))
    })

    widgetGrid.replaceChildren(widgetGridItems)
    const div = document.querySelector('#widget-type')
    div.replaceChildren(_createListOfWidgetTypes())
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

function _createListOfWidgetTypes() {
    const types = widgets.getTypes()

    const select = document.createElement('select')
    select.name = 'type'
    select.required = true
    // first option as a title
    let initialOption = document.createElement('option')
    initialOption.innerText = 'Select widget'
    initialOption.value = ""
    select.appendChild(initialOption)
    // actual options after
    for (let type of types) {
        if (!widgets.isDraggable(type)) continue
        let option = document.createElement('option')
        option.innerText = type
        option.value = type
        select.appendChild(option)
    }
    return select
}

function createInputsForWidgetAttributes(type) {
    const div = document.querySelector('#widget-attributes')
    const attributes = widgets.getAttributes(type)

    const dom = new DocumentFragment()
    for (let key in attributes) {
        if (!key.startsWith('data-')) continue
        if (Array.isArray(attributes[key])) {
            // create dropdown
            const select = document.createElement('select')
            select.id = key
            for (let item of attributes[key]) {
                let option = document.createElement('option')
                option.value = item
                option.innerText = item
                select.appendChild(option)
            }
            dom.append(select)
        } else {
            // create input field
            const input = document.createElement('input')

            key == 'data-url' ? input.type = "url" : input.type = "text"

            input.id = key
            input.placeholder = widgets.getAttributes(type)[key]
            input.required = true
            dom.append(input)
        }
    }
    dom.childElementCount > 0 ? div.removeAttribute('hidden') : div.setAttribute('hidden', true)
    div.replaceChildren(dom)
}


function newWidget() {
    // create new object if attributes are set
    // storage.add(object)?
    // renderContent()?

    const type = _getSelectedType()
    const attributes = _getSelectedAttributes()

    function _getSelectedType() {
        const type = document.querySelector('#widget-type > select').value
        if (widgets.getTypes(type)) return type
    }

    function _getSelectedAttributes() {
        const nodeList = document.querySelectorAll('[id^="data-"]')

        let object = {}
        for (let node of nodeList) {
            if (node.value) object[node.id] = node.value
        }
        object["uuid"] = crypto.randomUUID()

        return object
    }

    if (type) storage.add({
        type: type,
        attributes
    })
}

export { renderContent, createInputsForWidgetAttributes, newWidget };
