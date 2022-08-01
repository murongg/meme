import { useBoard } from '~/context/board'
import { useTopMenu } from '~/store/topMenu'


const { canvas, isCreateText, undo, redo } = useBoard()

export const LEFT_TOOLS = [{
  type: 'pointer',
  icon: 'i-bxs-pointer',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    canvasRaw!.isDrawingMode = false
    isCreateText.value = false
    canvasRaw!.defaultCursor = ''
  },
}, {
  type: 'pencil',
  icon: 'i-bxs-pencil',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    canvasRaw!.isDrawingMode = !canvasRaw!.isDrawingMode
  },
}, {
  type: 'text',
  icon: 'i-material-symbols-text-fields-rounded',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    isCreateText.value = true
    canvasRaw!.defaultCursor = 'text'
  },
}, {
  type: 'undo',
  icon: 'i-bx-undo',
  event: () => {
    undo.value()
  },
}, {
  type: 'redo',
  icon: 'i-bx-redo',
  event: () => {
    redo.value()
  },
}, {
  type: 'clear',
  icon: 'i-carbon-clean',
  event: () => {
    canvas.value?.clear()
  }
}]

export const TOP_MENU = [{
  type: 'up',
  icon: 'i-material-symbols-arrow-upward',
  event: () => {
    canvas.value?.bringForward(canvas.value.getActiveObject())
  },
}, {
  type: 'down',
  icon: 'i-material-symbols-arrow-downward',
  event: () => {
    canvas.value?.sendBackwards(canvas.value.getActiveObject())
  },
}, {
  type: 'delete',
  icon: 'i-material-symbols-delete-outline',
  event: () => {
    const topMenu = useTopMenu()
    const canvasRaw = toRaw(canvas.value)
    canvasRaw?.remove(canvasRaw.getActiveObject())
    topMenu.visable = false
  },
}]
