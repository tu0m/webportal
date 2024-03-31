function save(object, item = 'widgets') {
    // check data integrity, discard invalid?

    if (!object) return new Error('nothing to save')
    if (!_localStorageAvailable()) return new Error('localStorage failed')

    localStorage.setItem(item, JSON.stringify(object))
}

function load(item = 'widgets') {
    // TODO: check that all attributes are found (in case new ones were added) and fill them with default values if missing?
    // data-attributes should be the only ones unfillable? just delete the ones with missing data-attribute keys?
    const data = localStorage.getItem(item)
    if (data) return JSON.parse(data)
    if (item == 'widgets') return _loadDefault()
    return null
}

function _loadDefault() {
    return [{
        type: "Search",
        attributes: {
            "data-searchengine": "Google",
            "uuid": crypto.randomUUID()
        }
    }]
}

function _localStorageAvailable() {
    try {
        const x = "test"
        localStorage.setItem(x, x)
        localStorage.removeItem(x)
        return true
    } catch {
        return false
    }
}

function add(object) {
    let data = load()
    data.push(object)
    save(data)
}

function removeWidget(uuid) {
    let data = load()
    let filteredData = data.filter(item => item.attributes['uuid'] != uuid)
    save(filteredData)
}

export { save, load, add, remove, removeWidget };