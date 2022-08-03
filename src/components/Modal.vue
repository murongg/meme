<script setup lang="ts">
import type { StyleValue } from 'vue'
import { CANVAS_DRAW_CONTAINER_KEY, CANVAS_KEY } from '~/constants/elements.js'
import { useBoard } from '~/context/board.js'
import { useModal } from '~/store/modal'

const { canvas } = useBoard()
const modal = useModal()
const imageBase64 = ref('')
const imageWidth = ref(0)
const imageHeight = ref(0)
const quality = ref(1)

watch(() => modal.visable, (val) => {
  if (val)
    generate()
})

function generate() {
  const canvasRaw = toRaw(canvas.value)
  const currentObjects = canvasRaw?.getObjects()
  let drawContainerObject: fabric.Rect | undefined
  currentObjects?.forEach((obj: any) => {
    if (obj.get(CANVAS_KEY) === CANVAS_DRAW_CONTAINER_KEY)
      drawContainerObject = obj
  })
  const { left, top, width, height } = (drawContainerObject as any)
  imageWidth.value = width
  imageHeight.value = height
  canvasRaw?.clone((e: fabric.Canvas) => {
    e.backgroundColor = undefined
    e.getObjects().forEach((obj, index) => {
      if (index < 2)
        e.remove(obj)
    })
    const result = e?.toDataURL({
      quality: quality.value,
      format: 'png',
      left,
      top,
      width,
      height,
    })
    imageBase64.value = result
  })
}

function close() {
  modal.visable = false
}

const imageStyle = computed<StyleValue>(() => {
  let width = 0
  let height = 0
  if (imageWidth.value > 500)
    width = 500
  else if (imageWidth.value < 300)
    width = 300
  else
    width = imageWidth.value

  height = width / imageWidth.value * imageHeight.value

  return {
    maxWidth: `${width}px`,
    maxHeight: `${height}px`,
  }
})
</script>

<template>
  <Transition
    name="custom-classes-transition" enter-active-class="animate__animated animate__bounceIn"
    leave-active-class="animate__animated animate__bounceOut"
  >
    <div
      v-show="modal.visable" card-container absolute flex justify="center" px="30px" py="30px" left="50%" ml="-300px"
      top="100px" min-w="600px" min-h="700px" bg="white"
    >
      <button icon-btn i-material-symbols-close absolute right="10px" top="10px" @click="close" />
      <img :src="imageBase64" :style="imageStyle">
    </div>
  </Transition>
</template>
