import type { Ref } from 'vue'
import { fabric } from 'fabric'
import { CANVAS_DRAW_CONTAINER_KEY, CANVAS_DRAW_DRAG_ELEMENT_KEY, CANVAS_KEY } from '~/constants/elements'
import { useTopMenu } from '~/store/topMenu'

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

export function changeTopMenuState(canvas: fabric.Canvas) {
  const topMenu = useTopMenu()
  let index = 0
  const currentActiveObject = canvas?.getActiveObject()
  const publichObjects = canvas?.getObjects()
    .filter(item => !hasPrivateElement(item))
  publichObjects
    .forEach((item, i) => {
      if (item === currentActiveObject)
        index = i
    })
  topMenu.upperDisabled = index === publichObjects.length - 1
  topMenu.lowerDisabled = index === 0
}

export function getPlatform() {
  const userAgent = navigator.userAgent
  const OK = -1
  if (userAgent.indexOf('Win') !== OK)
    return 'Windows'
  else if (userAgent.indexOf('Mac') !== OK)
    return 'Macintosh'
  else if (userAgent.indexOf('Linux') !== OK)
    return 'Linux'
  else
    return 'Windows'
}
