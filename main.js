import './widgets/index.js' // load web component modules
import * as ui from './scripts/ui.js'
import * as drag from './scripts/draganddrop.js'

function eventHandler(e) {
  switch (true) {
    case (e.type == 'submit'):
      ui.newWidget()
      e.target.hidePopover()
      ui.createInputsForWidgetAttributes()
      ui.renderContent()
      break;
    case (e.type == 'change' && e.target.parentElement.id == 'widget-type'):
      ui.createInputsForWidgetAttributes(e.target.value)
      break;
  }
}

function dragAndDropHandler(e) {
  switch (true) {
    case (e.type == 'dragstart'):
      drag.start(e)
      break;
    case (e.type == 'dragend'):
      drag.end(e)
      break;
    case (e.type == 'dragenter'):
      drag.enter(e)
      break;
    case (e.type == 'dragleave'):
      drag.leave(e)
      break;
    case (e.type == 'dragover'):
      drag.over(e)
      break;
    case (e.type == 'drop'):
      drag.drop(e)
      ui.renderContent()
      break;
  }
}

// visual indication if browser is online
; (function interval() {
  navigator.onLine
    ? document.body.style.filter = "none"
    : document.body.style.filter = "grayscale(100%)"

  setTimeout(interval, 5000)
})();

ui.renderContent()

// setup event listeners
window.onload = () => {
  // document.addEventListener('keydown', eventHandler)
  // document.addEventListener('mouseup', eventHandler)
  document.addEventListener('change', eventHandler)
  document.addEventListener('submit', eventHandler)

  const widgetGrid = document.querySelector('#widget-grid')
  const observer = new MutationObserver(callback)

  function callback() {
    // re-add all event listeners for widgets after DOM changes
    for (let widget of widgetGrid.childNodes) {
      if (widget.getAttribute('draggable') == 'false') continue

      widget.removeEventListener('dragstart', dragAndDropHandler);
      widget.removeEventListener('dragend', dragAndDropHandler);
      widget.removeEventListener('dragenter', dragAndDropHandler);
      widget.removeEventListener('dragleave', dragAndDropHandler);
      widget.removeEventListener('dragover', dragAndDropHandler);
      widget.removeEventListener('drop', dragAndDropHandler);

      widget.addEventListener('dragstart', dragAndDropHandler);
      widget.addEventListener('dragend', dragAndDropHandler);
      widget.addEventListener('dragenter', dragAndDropHandler);
      widget.addEventListener('dragleave', dragAndDropHandler);
      widget.addEventListener('dragover', dragAndDropHandler);
      widget.addEventListener('drop', dragAndDropHandler);
    }
  }
  observer.observe(widgetGrid, { childList: true })
  callback()

  const deleteArea = document.querySelector('#delete-area')
  deleteArea.addEventListener('dragenter', dragAndDropHandler)
  deleteArea.addEventListener('dragleave', dragAndDropHandler)
  deleteArea.addEventListener('dragover', dragAndDropHandler)
  deleteArea.addEventListener('drop', dragAndDropHandler)
}
