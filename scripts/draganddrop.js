// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API


function start(e) {
    // The dragstart event is fired when the user starts dragging an element or text selection.
    e.target.style.opacity = '0.5'


    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);

    return false
}

function end(e) {
    // The dragend event is fired when a drag operation ends (by releasing a mouse button or hitting the escape key).
    e.target.style.opacity = '1'
    return false
}

function enter(e) {
    // The dragenter event is fired when a dragged element or text selection enters a valid drop target.
    e.preventDefault()
    return false
}

function leave(e) {
    // The dragleave event is fired when a dragged element or text selection leaves a valid drop target.
    e.preventDefault()
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


    console.log(e.dataTransfer.getData('text/html'))
    console.log((e.target.outerHTML))
    return false
}

export { start, end, enter, leave, over, drop }