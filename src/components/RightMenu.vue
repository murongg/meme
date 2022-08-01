<script setup lang="ts">
import { useBoard } from '~/context/board'
import { useRightMenu } from '~/store/rightMenu'
import { useTopMenu } from '~/store/topMenu';
const rightMenu = useRightMenu()
const topMenu = useTopMenu()
const menu = ref(null)
onMounted(() => {
  rightMenu.menuRef = menu.value
})
const { canvas } = useBoard()

function exiting() {
  rightMenu.hideMenu()
  topMenu.visable = false
}

function upper() {
  canvas.value?.bringForward(canvas.value.getActiveObject())
  exiting()
}

function lower() {
  canvas.value?.sendBackwards(canvas.value.getActiveObject())
  exiting()
}

function top() {
  canvas.value?.bringToFront(canvas.value.getActiveObject())
  exiting()
}

function bottom() {
  canvas.value?.sendToBack(canvas.value.getActiveObject())
  exiting()
}

function remove() {
  canvas.value?.remove(canvas.value.getActiveObject())
  exiting()
}
</script>

<template>
  <div v-show="rightMenu.visable" id="menu" ref="menu" w="150px" absolute overflow="hidden" text="sm"
    class="menu-x card-container" :style="rightMenu.position" @contextmenu.prevent="">
    <div @click="upper">
      上移一层
    </div>
    <div @click="lower">
      下移一层
    </div>
    <div @click="top">
      置于顶层
    </div>
    <div @click="bottom">
      置于底层
    </div>
    <div @click="remove">
      删除
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-x {
  div {
    box-sizing: border-box;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
      background-color: antiquewhite;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
