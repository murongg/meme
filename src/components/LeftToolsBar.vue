<script setup lang="ts">
import type { Ref } from 'vue'
import { useBoard } from '~/context/board.js'
import { hasPrivateElement } from '~/context/utils.js'
import { useModal } from '~/store/modal.js'
import { useTopMenu } from '~/store/topMenu.js'

const el: Ref<HTMLElement | null> = ref(null)
const { style } = useDraggable(el, {
  initialValue: { x: 100, y: 100 },
  preventDefault: true,
})

const { canvas, isCreateText, undo, redo } = useBoard()
const topMenu = useTopMenu()

function commonHandler() {
  topMenu.visable = false
}

function pointer() {
  const canvasRaw = toRaw(canvas.value)
  canvasRaw!.isDrawingMode = false
  isCreateText.value = false
  canvasRaw!.defaultCursor = ''
  commonHandler()
}

function pencil() {
  const canvasRaw = toRaw(canvas.value)
  canvasRaw!.isDrawingMode = !canvasRaw!.isDrawingMode
  commonHandler()
}

function text() {
  const canvasRaw = toRaw(canvas.value)
  isCreateText.value = true
  canvasRaw!.defaultCursor = 'text'
  commonHandler()
}

function undoHandler() {
  undo.value()
  commonHandler()
}

function redoHandler() {
  redo.value()
  commonHandler()
}

function clear() {
  const canvasRaw = toRaw(canvas.value)
  canvasRaw?.getObjects().forEach((obj) => {
    if (!hasPrivateElement(obj))
      canvasRaw.remove(obj)
  })
  commonHandler()
}

function download() {
  const canvasRaw = toRaw(canvas.value)
  if ((canvasRaw?.getObjects().length || 0) <= 2) {
    window.alert('先在画布画点东西吧！')
    return
  }
  const modal = useModal()
  modal.visable = true
}
</script>

<template>
  <div
    ref="el" absolute display="flex" py="20px" flex="col" items="center" w="70px" z="100" cursor="move"
    :style="style" class="card-container"
  >
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="pointer">
      <i icon-btn i-bxs-pointer text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="pencil">
      <i icon-btn i-bxs-pencil text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="text">
      <i icon-btn i-material-symbols-text-fields-rounded text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="undoHandler">
      <i icon-btn i-bx-undo text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="redoHandler">
      <i icon-btn i-bx-redo text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="20px" @click.stop="clear">
      <i icon-btn i-carbon-clean text="8" />
    </div>
    <div card-icon w="50px" h="50px" mb="0px" @click.stop="download">
      <i icon-btn i-bxs-download text="8" />
    </div>
  </div>
</template>
