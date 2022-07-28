import { fabric } from "fabric"
import { IEvent } from "fabric/fabric-impl";
import { Ref } from "vue";
import { useRightMenu } from "~/store/rightMenu";

let canvas: Ref<fabric.Canvas | null> = ref(null)

function initElements() {
  let rect = new fabric.Rect({
    top: 30,
    left: 30,
    fill: 'orange',
    width: 100,
    height: 100
  })

  let circle = new fabric.Circle({
    top: 50,
    left: 60,
    fill: 'hotpink',
    radius: 50
  })

  let triangle = new fabric.Triangle({
    top: 80,
    left: 30,
    width: 80,
    height: 100,
    fill: 'blue'
  })

  const canvasRaw = toRaw(canvas.value)
  canvasRaw?.add(rect, circle, triangle)

}


function initEvents() {
  const rightMenu = useRightMenu()
  async function canvasOnMouseDown(opt: IEvent<MouseEvent>) {
    if (opt.button === 3 && opt.target) {
      rightMenu.showMenu()
      await nextTick()
      if (rightMenu.menuRef && canvas.value) {
        const menuWidth = (rightMenu.menuRef as unknown as HTMLElement).offsetWidth
        const menuHeight = (rightMenu.menuRef as unknown as HTMLElement).offsetHeight
        // 当前鼠标位置
        let pointX = opt.pointer?.x || 0
        let pointY = opt.pointer?.y || 0

        if (canvas.value.width! - pointX <= menuWidth) {
          pointX -= menuWidth
        }
        if (canvas.value.height! - pointY <= menuHeight) {
          pointY -= menuHeight
        }

        rightMenu.position = {
          left: `${pointX}px`,
          top: `${pointY}px`
        }
      }

    } else {
      rightMenu.hideMenu()
    }
  }

  canvas.value?.on('mouse:down', canvasOnMouseDown)

  document.onkeydown = function (e) {
    if (e.key === 'Backspace') {
      canvas.value?.remove(canvas.value.getActiveObject())
    }
  }
}


export const useBoard = () => {
  function init(canvasElement: HTMLCanvasElement) {
    canvas.value = new fabric.Canvas(canvasElement!, {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      backgroundColor: '#f5f5f5',
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: true, // 禁止默认右键菜单
      preserveObjectStacking: true
    });

    useResizeObserver(document.body, useThrottleFn((entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      canvas.value!.width = width
      canvas.value!.height = height
    }, 200))

    initElements()
    initEvents()
  }

  return {
    canvas,
    init
  }
}
