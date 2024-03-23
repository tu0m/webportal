import './search-widget.js'
import './clock-widget.js'
import './date-widget.js'
import './link-widget.js'

import searchEngines from './searchengines.json'

const library = [
    {
        type: "Search",
        tag: `<search-widget class="bar widget" data-searchengine></search-widget>`,
        attributes: {
            'data-searchengine': _searchEngineNames()
        },
    },
    {
        type: "Clock",
        tag: `<clock-widget class="square widget" data-city></clock-widget>`,
        attributes: {
            'data-city': 'Location (currently not working)'
        },
    },
    {
        type: "Date",
        tag: `<date-widget class="square widget"></date-widget>`,
        attributes: null,
    },
    {
        type: "Link",
        tag: `<link-widget class="square widget" tabindex="0" data-name data-url></link-widget>`,
        attributes: {
            'data-name': 'Website name',
            'data-url': 'URL'
        },
    },
]

function _searchEngineNames() {
    let array = []
    Object.values(searchEngines).forEach(value => {
        if (value.name) array.push(value.name)
    })
    return array
}

function types() {
    return library.map(item => item.type)
}

function attributes(type) {
    return library.find(item => item.type == type).attributes
}

function htmlTag(type) {
    return library.find(item => item.type == type).tag
}

export { library, types, attributes, htmlTag };
