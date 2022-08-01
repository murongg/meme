<script setup lang="ts">
import { useTopMenu } from '~/store/topMenu'
import { TOP_MENU } from '~/context/tools'
const topMenu = useTopMenu()
const el = ref(null)
onMounted(() => {
  topMenu.menuRef = el.value
})
</script>

<template>
  <div
    v-show="topMenu.visable" ref="el" absolute display="flex" py="5px" items="center" z="100"
    class="card-container" left="500px" top="100px" :style="topMenu.position"
  >
    <div
      v-for="menu in TOP_MENU" :key="menu.type" w="30px" h="30px" class="card-icon" mx="7px"
      @click.stop="menu.event"
    >
      <i icon-btn :class="menu.icon" text="5" shadow="2xl" />
    </div>
  </div>
</template>
