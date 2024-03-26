function save(object) {
    // check data integrity, discard invalid?

    if (!object) return new Error('nothing to save')
    if (!localStorageAvailable()) return new Error('localStorage not available')

    localStorage.setItem('widgets', JSON.stringify(object))
}

function load() {
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

    // return [{
    //     type: "Link",
    //     attributes: {
    //         "data-name": "Reddit",
    //         "data-url": "reddit.com"
    //     }
    // }]
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
    try {
        save(data)
    } catch {
        return new Error('could not save')
    }
}

function remove(object) {

}

export { save, load, add, remove };