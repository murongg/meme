import { UnwrapNestedRefs } from "vue"


const history: UnwrapNestedRefs<string[]> = reactive([])
const futures: UnwrapNestedRefs<string[]> = reactive([])

export function initEdits(canvas: fabric.Canvas) {
  let handler = false
  function init() {
    function updateCanvasState() {
      if (!handler) {
        const json = canvas.toJSON()
        history.push(json)
      }
    }
    updateCanvasState()
    canvas.on('object:modified', () => {
      updateCanvasState()
    });
    canvas.on('object:added', () => {
      updateCanvasState()
    });
    canvas.on('object:removed', () => {
      updateCanvasState()
    });
    canvas.on('object:rotating', () => {
      updateCanvasState()
    });
  }

  function redo() {
    if (futures.length === 0) {
      return
    }
    handler = true
    canvas.loadFromJSON(futures.at(-1), () => {
      const last = futures.pop()
      last && history.push(last)
      handler = false
    })
  }

  function undo() {
    if (history.length === 1) {
      return
    }
    handler = true
    const last = history.pop()
    canvas.loadFromJSON(history.at(-1), () => {
      last && futures.push(last)
      handler = false
    })
  }


  return {
    init,
    undo,
    redo,
    history,
    futures,
  }
}
