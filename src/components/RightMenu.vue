<script setup lang="ts">
import { useBoard } from '~/context/board'
import { useRightMenu } from '~/store/rightMenu'
const rightMenu = useRightMenu()
const menu = ref(null)
onMounted(() => {
  rightMenu.menuRef = menu.value
})
const { canvas } = useBoard()

function exiting() {
  rightMenu.hideMenu()
}

function upper() {
  canvas.value?.bringForward(canvas.value.getActiveObject())
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
  <div
    v-show="rightMenu.visable" id="menu" ref="menu" class="menu-x" :style="rightMenu.position"
    @contextmenu.prevent=""
  >
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
  width: 200px;
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

  div {
    box-sizing: border-box;
    padding: 4px 8px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
      background-color: antiquewhite;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
