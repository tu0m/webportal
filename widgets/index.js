import './search-bar.js'
import './clock-widget.js'
import './date-widget.js'
import './link-widget.js'

import searchEngines from './searchengines.json'

const searchEngineArray = () => {
    let array = []
    Object.values(searchEngines).forEach(value => {
        if (value.name) array.push(value.name)
    })
    return array
}

export const Widgets = [
    {
        type: "Search",
        tag: `<search-bar class="bar widget" searchengine></search-bar>`,
        attributes: { 'searchengine': searchEngineArray() }, // TODO: how to get all availabe search engines here?
    },
    {
        type: "Clock",
        tag: `<clock-widget class="square widget" city></clock-widget>`,
        attributes: { 'city': 'Location (currently not working)' },
    },
    {
        type: "Date",
        tag: `<date-widget class="square widget"></date-widget>`,
        attributes: null,
    },
    {
        type: "Link",
        tag: `<link-widget class="square widget" tabindex="0" name url></link-widget>`,
        attributes: {
            'name': 'Website name',
            'url': 'URL'
        },
    },
]
