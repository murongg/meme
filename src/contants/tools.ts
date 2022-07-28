import { fabric } from 'fabric'
import { useBoard } from '~/context/board'

const { canvas } = useBoard()

export const LEFT_TOOLS = [{
  type: 'pointer',
  icon: 'i-bxs-pointer',
  event: () => {

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
    const text = new fabric.IText('  ')
    canvasRaw?.add(text)
    canvasRaw?.setActiveObject(text)
  },
}]
