import type { Ref } from 'vue'
import { fabric } from 'fabric'
import { CANVAS_DRAW_CONTAINER_KEY, CANVAS_DRAW_DRAG_ELEMENT_KEY, CANVAS_KEY } from '~/constants/elements'

export function zoomToFitCanvas(canvas: Ref<fabric.Canvas | null>) {
  canvas.value?.setZoom(1)
  canvas.value?.absolutePan({ x: 0, y: 0 })
  const objects = canvas.value?.getObjects() || []

  if (objects.length > 0) {
    let rect = objects[0].getBoundingRect()

    let minX = rect.left
    let minY = rect.top
    let maxX = rect.left + rect.width
    let maxY = rect.top + rect.height

    for (let i = 0; i < objects.length; i++) {
      rect = objects[i].getBoundingRect()
      minX = Math.min(minX, rect.left)
      minY = Math.min(minY, rect.top)
      maxX = Math.max(maxX, rect.left + rect.width)
      maxY = Math.max(maxY, rect.top + rect.height)
    }

    const canvasWidth = canvas.value?.width || 0
    const canvasHeight = canvas.value?.height || 0

    const panX = (maxX - minX - canvasWidth) / 2 + minX
    const panY = (maxY - minY - canvasHeight) / 2 + minY
    // 开始平移
    canvas.value?.absolutePan({ x: panX, y: panY })
    // 计算缩放比例
    const zoom = Math.min(canvasWidth / (maxX - minX), canvasHeight / (maxY - minY))
    // 计算缩放中心
    const zoomPoint = new fabric.Point(canvasWidth / 2, canvasHeight / 2)
    // 开始缩放
    canvas.value?.zoomToPoint(zoomPoint, zoom * 0.8)
  }
}

export function hasPrivateElement(obj: any) {
  const key = obj.get(CANVAS_KEY)
  return key === CANVAS_DRAW_CONTAINER_KEY || key === CANVAS_DRAW_DRAG_ELEMENT_KEY
}
