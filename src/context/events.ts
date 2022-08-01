import { fabric } from 'fabric'
import type { IEvent } from 'fabric/fabric-impl'
import type { Ref } from 'vue'
import { TOP_MENU_THRESHOLD } from '~/constants/elements'
import { useRightMenu } from '~/store/rightMenu'
import { useTopMenu } from '~/store/topMenu'

export function initEvents(canvas: fabric.Canvas, options: {
  isCreateText: Ref<boolean>
}) {
  const rightMenu = useRightMenu()
  const topMenu = useTopMenu()

  async function canvasOnMouseDown(opt: IEvent<MouseEvent>) {
    let pointX = opt.pointer?.x || 0
    let pointY = opt.pointer?.y || 0
    if (opt.button === 3 && opt.target) {
      rightMenu.showMenu()
      await nextTick()
      if (rightMenu.menuRef && canvas) {
        const menuWidth = (rightMenu.menuRef as unknown as HTMLElement).offsetWidth
        const menuHeight = (rightMenu.menuRef as unknown as HTMLElement).offsetHeight
        // 当前鼠标位置
        if (canvas.width! - pointX <= menuWidth)
          pointX -= menuWidth

        if (canvas.height! - pointY <= menuHeight)
          pointY -= menuHeight

        rightMenu.position = {
          left: `${pointX}px`,
          top: `${pointY}px`,
        }
      }
    }
    else if (opt.button === 1) {
      if (options.isCreateText.value) {
        const text = new fabric.IText('', {
          left: pointX,
          top: pointY,
          padding: 7,
        })
        canvas?.add(text)
        canvas?.setActiveObject(text)
        options.isCreateText.value = false
        canvas!.defaultCursor = ''
      }
      rightMenu.hideMenu()
    }
    else {
      rightMenu.hideMenu()
    }
  }

  async function canvasOnMouseUp(opt: IEvent<MouseEvent>) {
    const currentActiveObject = canvas.getActiveObject()
    if (currentActiveObject) {
      topMenu.visable = true
      await nextTick()
      const { top } = currentActiveObject
      const lineCoords = (currentActiveObject as any).lineCoords
      // top left x
      const tlx = lineCoords.tl.x
      // top right x
      const trx = lineCoords.tr.x
      const width = trx - tlx
      const menuRef = topMenu.menuRef as unknown as HTMLElement
      const left = (tlx + width! / 2) - (menuRef.clientWidth / 2)
      topMenu.position = {
        left: `${left}px`,
        top: `${top! - menuRef.clientHeight - TOP_MENU_THRESHOLD}px`
      }
    } else {
      topMenu.visable = false
    }
  }

  canvas.on('mouse:down', canvasOnMouseDown)
  canvas.on('mouse:up', canvasOnMouseUp)

  document.onkeydown = function (e) {
    if (e.key === 'Backspace') {
      canvas?.remove(canvas.getActiveObject())
      topMenu.visable = false
    }
  }
}
