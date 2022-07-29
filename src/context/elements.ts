import { fabric } from 'fabric'

export function initElements(canvas: fabric.Canvas) {
  const rect = new fabric.Rect({
    top: 30,
    left: 30,
    fill: 'orange',
    width: 100,
    height: 100,
  })

  const circle = new fabric.Circle({
    top: 50,
    left: 60,
    fill: 'hotpink',
    radius: 50,
  })

  const triangle = new fabric.Triangle({
    top: 80,
    left: 30,
    width: 80,
    height: 100,
    fill: 'blue',
  })

  const canvasRaw = toRaw(canvas)
  canvasRaw?.add(rect, circle, triangle)
}
