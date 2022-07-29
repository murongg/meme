import { fabric } from 'fabric'
import type { Ref } from 'vue'
import { initElements } from './elements'
import { initEvents } from './events'

const canvas: Ref<fabric.Canvas | null> = ref(null)
const isCreateText: Ref<boolean> = ref(false)

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

    initElements(toRaw(canvas.value))
    initEvents(toRaw(canvas.value), { isCreateText })
    // zoomToFitCanvas(canvas)
  }

  return {
    canvas,
    init,
    isCreateText
  }
}
