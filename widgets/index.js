import './search-widget.js'
import './clock-widget.js'
import './date-widget.js'
import './link-widget.js'
import './weather-widget.js'

import searchEngines from '../json/searchengines.json'
import countries from '../json/countries.json'

const library = [
    {
        type: "Search",
        tag: 'search-widget',
        attributes: {
            'data-searchengine': _searchEngineNames(),
            class: 'bar widget',
            draggable: false,
            uuid: _randomUUID
        }
    },
    {
        type: "Clock",
        tag: 'clock-widget',
        attributes: {
            'data-city': 'Location (WIP)',
            class: 'square widget',
            draggable: true,
            uuid: _randomUUID
        }
    },
    {
        type: "Date",
        tag: 'date-widget',
        attributes: {
            class: 'square widget',
            draggable: true,
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
            draggable: true,
            uuid: _randomUUID
        }
    },
    {
        type: "Weather",
        tag: 'weather-widget',
        attributes: {
            'data-country': _countryNames(),
            'data-city': 'City',
            class: 'square widget',
            tabindex: '0',
            draggable: true,
            uuid: _randomUUID
        }
    }
]

function _searchEngineNames() {
    let array = []
    Object.values(searchEngines).forEach(value => {
        if (value.name) array.push(value.name)
    })
    return array
}

function _countryNames() {
    let array = []
    Object.values(countries).forEach(value => {
        array.push(value)
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

function isDraggable(type) {
    return library.find(item => item.type == type).attributes['draggable']
}

export { library, getTypes, getAttributes, getTag, isDraggable };
