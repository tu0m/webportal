import './search-widget.js'
import './clock-widget.js'
import './date-widget.js'
import './link-widget.js'
import './weather-widget.js'

import searchEngines from '../json/searchengines.json'
import countries from '../json/countries.json'

const template = [
    {
        type: "Public name",
        tag: '[widgetName]-widget',
        attributes: {
            'data-attribute': 'String', // Strings will convert to inputs
            'data-attribute': ['Array'], // Arrays of strings will convert to dropdown lists
            class: 'square widget', // Apply standard widget CSS
            tabindex: '0', // Widget is focusable by keyboard, optional
            draggable: true, // Widget can be repositioned in grid (is false, widget will not be addable or removable by user)
            uuid: null // Unique identifier needed for functionality, leave as null
        }
    }
]


const library = [
    {
        type: "Search",
        tag: 'search-widget',
        attributes: {
            'data-searchengine': Array.from(Object.values(searchEngines).map(item => item.name).filter(item => item.length != 0)),
            class: 'bar widget',
            draggable: true,
            uuid: null
        }
    },
    {
        type: "Clock",
        tag: 'clock-widget',
        attributes: {
            'data-city': 'Location (WIP)',
            class: 'square widget',
            draggable: true,
            uuid: null
        }
    },
    {
        type: "Date",
        tag: 'date-widget',
        attributes: {
            class: 'square widget',
            draggable: true,
            uuid: null
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
            uuid: null
        }
    },
    {
        type: "Weather",
        tag: 'weather-widget',
        attributes: {
            'data-country': Array.from(Object.values(countries)),
            'data-city': 'City',
            class: 'square widget',
            tabindex: '0',
            draggable: true,
            uuid: null
        }
    }
]

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
