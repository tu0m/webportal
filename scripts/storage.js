function save(object) {
    // check data integrity, discard invalid?

    if (!object) return new Error('nothing to save')
    if (!localStorageAvailable()) return new Error('localStorage failed')

    localStorage.setItem('widgets', JSON.stringify(object))
}

function load() {
    // TODO: check that all attributes are found (in case new ones were added) and fill them with default values if missing?
    // data-attributes should be the only ones unfillable? just delete the ones with missing data-attribute keys?
    const data = localStorage.getItem('widgets')
    if (data) return JSON.parse(data)

    return loadDefault()
}

function loadDefault() {
    return [{
        type: "Search",
        attributes: {
            "data-searchengine": "Google",
            "uuid": crypto.randomUUID()
        }
    }]
}

function localStorageAvailable() {
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

function remove(uuid) {
    let data = load()
    let filteredData = data.filter(item => item.attributes['uuid'] != uuid)
    save(filteredData)
}

export { save, load, add, remove };