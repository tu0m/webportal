import * as storage from '../scripts/storage.js'

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

const deleteArea = document.querySelector('#delete-area')

function start(e) {
    // The dragstart event is fired when the user starts dragging an element or text selection.
    e.target.style.opacity = '0.5'

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/plain', e.target.getAttribute('uuid'));

    deleteArea.style.color = 'var(--color-text)'
    deleteArea.showPopover()

    return false
}

function end(e) {
    // The dragend event is fired when a drag operation ends (by releasing a mouse button or hitting the escape key).
    e.target.style.opacity = '1'
    deleteArea.hidePopover()

    return false
}

function enter(e) {
    // The dragenter event is fired when a dragged element or text selection enters a valid drop target.
    e.preventDefault()

    if (e.target.id == 'delete-area') {
        e.target.style.color = 'var(--color-hover)'
    }

    return false
}

function leave(e) {
    // The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
    e.preventDefault()

    if (e.target.id == 'delete-area') {
        e.target.style.color = 'var(--color-text)'
    }

    return false
}

function over(e) {
    // The dragover event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
    e.preventDefault()

    return false
}

function drop(e) {
    // The drop event is fired when an element or text selection is dropped on a valid drop target.
    e.stopPropagation()
    deleteArea.hidePopover()

    if (e.target.id == 'delete-area') {
        // delete widget
        const uuid = e.dataTransfer.getData('text/plain')
        storage.remove(uuid)
        return
    }

    if (e.target.hasAttribute('uuid')) {
        // swap widgets position
        const startUUID = e.dataTransfer.getData('text/plain')
        const dropUUID = e.target.getAttribute('uuid')

        if (startUUID != dropUUID) {
            let data = storage.load()

            const startIndex = data.findIndex(item => item.attributes['uuid'] == startUUID)
            const dropIndex = data.findIndex(item => item.attributes['uuid'] == dropUUID);

            [data[startIndex], data[dropIndex]] = [data[dropIndex], data[startIndex]]
            storage.save(data)
            return
        }
    }

    throw new Error('drop failed')
}

export { start, end, enter, leave, over, drop }