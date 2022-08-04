import { fabric } from 'fabric'
import { CANVAS_DRAW_CONTAINER_KEY, CANVAS_DRAW_CONTAINER_MAX_HEIGHT, CANVAS_DRAW_CONTAINER_MAX_WIDTH, CANVAS_DRAW_CONTAINER_MIN_HEIGHT, CANVAS_DRAW_CONTAINER_MIN_WIDTH, CANVAS_DRAW_DRAG_ELEMENT_KEY, CANVAS_KEY } from '~/constants/elements'
export function initElements(canvas: fabric.Canvas) {
  const { bodyHeight, bodyWidth, rectWidth, rectHeight, left, top } = computedRect()
  const rect = new fabric.Rect({
    top,
    left,
    fill: 'white',
    width: rectWidth,
    height: rectHeight,
    hasControls: false,
    selectable: false,
    hoverCursor: 'default',
  })

  const triangleWidth = 50
  const triangleHeight = 25

  let oldTriangleLeft = rect.left! + rectWidth + 19
  let oldTriangleTop = rect.top! + rectHeight - 17
  const triangle = new fabric.Triangle({
    hasBorders: false,
    hasControls: false,
    selectable: true,
    top: oldTriangleTop,
    left: oldTriangleLeft,
    width: triangleWidth,
    height: triangleHeight,
    fill: '#bbb',
    angle: 135,
    hoverCursor: 'nw-resize',
  })

  const moving = () => {
    let width = rect.width! + triangle.left! - oldTriangleLeft
    let height = rect.height! + triangle.top! - oldTriangleTop
    if (width <= CANVAS_DRAW_CONTAINER_MIN_WIDTH)
      width = CANVAS_DRAW_CONTAINER_MIN_WIDTH
    else if (width >= CANVAS_DRAW_CONTAINER_MAX_WIDTH)
      width = CANVAS_DRAW_CONTAINER_MAX_WIDTH

    if (height <= CANVAS_DRAW_CONTAINER_MIN_HEIGHT)
      height = CANVAS_DRAW_CONTAINER_MIN_HEIGHT
    else if (height >= CANVAS_DRAW_CONTAINER_MAX_HEIGHT)
      height = CANVAS_DRAW_CONTAINER_MAX_HEIGHT

    const left = bodyWidth / 2 - width / 2
    const top = bodyHeight / 2 - height / 2
    rect.width = width
    rect.height = height
    rect.left = left
    rect.top = top
    const newTriangleLeft = left + width + 19
    const newTriangleTop = rect.top! + height - 17
    triangle.left = newTriangleLeft
    triangle.top = newTriangleTop
    oldTriangleLeft = newTriangleLeft
    oldTriangleTop = newTriangleTop
  }

  triangle.on('moving', moving);

  (rect as any).set(CANVAS_KEY, CANVAS_DRAW_CONTAINER_KEY);
  (triangle as any).set(CANVAS_KEY, CANVAS_DRAW_DRAG_ELEMENT_KEY)

  const canvasRaw = toRaw(canvas)
  canvasRaw?.add(rect)
  canvasRaw.add(triangle)
  // triangle is forbidden to be selected.
  canvasRaw?.on('mouse:down:before', () => {
    triangle.selectable = true
  })
  canvasRaw?.on('mouse:up:before', () => {
    triangle.selectable = false
  })

  return {
    rect,
    triangle
  }
}

export function computedRect(isCollapse: boolean = true) {
  const body = document.body
  const rightPanelWidth = isCollapse ? 0 : 400
  const bodyWidth = body.clientWidth - rightPanelWidth
  const bodyHeight = body.clientHeight
  const rectWidth = 400
  const rectHeight = 400
  const left = bodyWidth / 2 - rectWidth / 2
  const top = bodyHeight / 2 - rectHeight / 2
  return {
    bodyWidth,
    bodyHeight,
    rectWidth,
    rectHeight,
    left,
    top
  }
}
