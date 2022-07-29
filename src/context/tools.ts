import { useBoard } from '~/context/board'

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
}]
