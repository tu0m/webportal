import './widgets/index.js' // load web component modules
import * as ui from './scripts/ui.js'
import * as drag from './scripts/draganddrop.js'

function eventHandler(e) {
  switch (true) {
    case ((e.key == 'Enter' || e.key == ' ' || e.button == 0) && e.target.id == 'add-button'):
      ui.newWidget()
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

window.onload = () => {
  document.addEventListener('keydown', eventHandler)
  document.addEventListener('mouseup', eventHandler)
  document.addEventListener('change', eventHandler)

  // drag and drop
  document.addEventListener('dragstart', dragAndDropHandler);
  document.addEventListener('dragend', dragAndDropHandler);
  document.addEventListener('dragenter', dragAndDropHandler);
  document.addEventListener('dragleave', dragAndDropHandler);
  document.addEventListener('dragover', dragAndDropHandler);
  document.addEventListener('drop', dragAndDropHandler);

}


