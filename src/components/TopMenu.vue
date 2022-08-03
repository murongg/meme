<script setup lang="ts">
import { useTopMenu } from '~/store/topMenu'
import { useBoard } from '~/context/board.js'
import { changeTopMenuState } from '~/context/utils.js'
const topMenu = useTopMenu()
const { canvas } = useBoard()
const el = ref(null)
onMounted(() => {
  topMenu.menuRef = el.value
})

function up() {
  canvas.value?.bringForward(canvas.value.getActiveObject())
  changeTopMenuState(toRaw(canvas.value!))
}

function down() {
  canvas.value?.sendBackwards(canvas.value.getActiveObject())
  changeTopMenuState(toRaw(canvas.value!))
}

function remove() {
  const canvasRaw = toRaw(canvas.value)
  canvasRaw?.remove(canvasRaw.getActiveObject())
  topMenu.visable = false
}
</script>

<template>
  <div
    v-show="topMenu.visable" ref="el" absolute display="flex" py="5px" items="center" z="100" class="card-container"
    left="500px" top="100px" :style="topMenu.position"
  >
    <div w="30px" h="30px" class="card-icon" mx="7px" @click.stop="up">
      <button
        :disabled="topMenu.upperDisabled" disabled:color="#eee" icon-btn i-material-symbols-arrow-upward text="5"
        shadow="2xl"
      />
    </div>
    <div w="30px" h="30px" class="card-icon" mx="7px" @click.stop="down">
      <button
        :disabled="topMenu.lowerDisabled" disabled:color="#eee" icon-btn i-material-symbols-arrow-downward
        text="5" shadow="2xl"
      />
    </div>
    <div w="30px" h="30px" class="card-icon" mx="7px" @click.stop="remove">
      <button icon-btn i-material-symbols-delete-outline text="5" shadow="2xl" />
    </div>
  </div>
</template>
