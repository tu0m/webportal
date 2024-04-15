import './widgets/index.js' // load web component modules
import * as grid from './scripts/grid.js'
import * as menu from './scripts/menu.js'
import * as drag from './scripts/draganddrop.js'

function eventHandler(e) {
  switch (true) {
    case (e.type == 'beforetoggle' && e.newState == 'open'):
      menu.createListOfWidgetTypes()
    case (e.type == 'submit'):
      menu.newWidget()
      e.target.hidePopover()
      menu.createInputsForWidgetAttributes()
      grid.renderContent()
      break;
    case (e.type == 'change' && e.target.parentElement.id == 'widget-type'):
      menu.createInputsForWidgetAttributes(e.target.value)
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
      try {
        drag.drop(e)
        grid.renderContent()
      } catch (error) {
        // drop failed, do nothing
      }
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

grid.renderContent()

// setup event listeners
window.onload = () => {
  // document.addEventListener('keydown', eventHandler)
  // document.addEventListener('mouseup', eventHandler)
  document.querySelector('#menu').addEventListener('beforetoggle', eventHandler)
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
