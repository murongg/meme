import { hasPrivateElement } from './utils'
import { useBoard } from '~/context/board'
import { useTopMenu } from '~/store/topMenu'

const { canvas, isCreateText, undo, redo } = useBoard()

function commonHandler() {
  const topMenu = useTopMenu()
  topMenu.visable = false
}

export const LEFT_TOOLS = [{
  type: 'pointer',
  icon: 'i-bxs-pointer',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    canvasRaw!.isDrawingMode = false
    isCreateText.value = false
    canvasRaw!.defaultCursor = ''
    commonHandler()
  },
}, {
  type: 'pencil',
  icon: 'i-bxs-pencil',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    canvasRaw!.isDrawingMode = !canvasRaw!.isDrawingMode
    commonHandler()
  },
}, {
  type: 'text',
  icon: 'i-material-symbols-text-fields-rounded',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    isCreateText.value = true
    canvasRaw!.defaultCursor = 'text'
    commonHandler()
  },
}, {
  type: 'undo',
  icon: 'i-bx-undo',
  event: () => {
    undo.value()
    commonHandler()
  },
}, {
  type: 'redo',
  icon: 'i-bx-redo',
  event: () => {
    redo.value()
    commonHandler()
  },
}, {
  type: 'clear',
  icon: 'i-carbon-clean',
  event: () => {
    const canvasRaw = toRaw(canvas.value)
    canvasRaw?.getObjects().forEach((obj) => {
      if (!hasPrivateElement(obj))
        canvasRaw.remove(obj)
    })
    commonHandler()
  },
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
    const canvasRaw = toRaw(canvas.value)
    canvasRaw?.remove(canvasRaw.getActiveObject())
    commonHandler()
  },
}]
