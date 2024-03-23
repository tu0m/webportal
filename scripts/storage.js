function save(object) {
    // check data integrity, discard invalid?

    // data format:
    //
    // [{
    //     type: "",
    //     attributes: {
    //         "": ""
    //     }
    // }]

    if (object.length == 0) return new Error('nothing to save')
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
        attributes: { "data-searchengine": "Google" }
    }]
}

function localStorageAvailable() {
    try {
        const storage = window[type]
        const x = "__storage_test__"
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch {
        return false
    }
}

export { save, load };