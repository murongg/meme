import { fabric } from 'fabric'
import type { Ref } from 'vue'
import { initEdits } from './edits'
import { initElements } from './elements'
import { initEvents } from './events'

const canvas: Ref<fabric.Canvas | null> = ref(null)
const isCreateText: Ref<boolean> = ref(false)
const redo = ref(() => { })
const undo = ref(() => { })
const rect = ref<fabric.Rect | undefined>()
const triangle = ref<fabric.Triangle | undefined>()
export const useBoard = () => {
  function init(canvasElement: HTMLCanvasElement) {
    canvas.value = new fabric.Canvas(canvasElement!, {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      backgroundColor: '#f5f5f5',
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      preserveObjectStacking: true,
    })

    useResizeObserver(document.body, useThrottleFn((entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      canvas.value!.width = width
      canvas.value!.height = height
    }, 200))

    const canvasRaw = toRaw(canvas.value)
    const { rect: r, triangle: t } = initElements(canvasRaw)
    rect.value = r
    triangle.value = t
    initEvents(canvasRaw, { isCreateText })
    const { init: initEditsEvent, undo: editUndo, redo: editRedo } = initEdits(canvasRaw)
    initEditsEvent()
    undo.value = editUndo
    redo.value = editRedo
    // zoomToFitCanvas(canvas)
  }

  return {
    canvas,
    rect,
    triangle,
    init,
    isCreateText,
    undo,
    redo,
  }
}
