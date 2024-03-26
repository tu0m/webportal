import './search-widget.js'
import './clock-widget.js'
import './date-widget.js'
import './link-widget.js'

import searchEngines from './searchengines.json'

const library = [
    {
        type: "Search",
        tag: 'search-widget',
        attributes: {
            'data-searchengine': _searchEngineNames(),
            class: 'bar widget',
            uuid: _randomUUID
        }
    },
    {
        type: "Clock",
        tag: 'clock-widget',
        attributes: {
            'data-city': 'Location (WIP)',
            class: 'square widget',
            uuid: _randomUUID
        }
    },
    {
        type: "Date",
        tag: 'date-widget',
        attributes: {
            class: 'square widget',
            uuid: _randomUUID
        }
    },
    {
        type: "Link",
        tag: 'link-widget',
        attributes: {
            'data-name': 'Website name',
            'data-url': 'URL',
            class: 'square widget',
            tabindex: '0',
            uuid: _randomUUID
        }
    },
]

function _searchEngineNames() {
    let array = []
    Object.values(searchEngines).forEach(value => {
        if (value.name) array.push(value.name)
    })
    return array
}

function _randomUUID() {
    return crypto.randomUUID()
}

function getTypes() {
    return library.map(item => item.type)
}

function getAttributes(type) {
    try {
        return library.find(item => item.type == type).attributes
    } catch {
        return null
    }

}

function getTag(type) {
    try {
        return library.find(item => item.type == type).tag
    } catch {
        return null
    }
}

export { library, getTypes, getAttributes, getTag };
