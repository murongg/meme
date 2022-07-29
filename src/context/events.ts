import { fabric } from 'fabric'
import type { IEvent } from 'fabric/fabric-impl'
import type { Ref } from 'vue'
import { useRightMenu } from '~/store/rightMenu'

export function initEvents(canvas: fabric.Canvas, options: {
  isCreateText: Ref<boolean>
}) {
  const rightMenu = useRightMenu()
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

  canvas?.on('mouse:down', canvasOnMouseDown)

  document.onkeydown = function (e) {
    if (e.key === 'Backspace')
      canvas?.remove(canvas.getActiveObject())
  }
}
