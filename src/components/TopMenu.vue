<script setup lang="ts">
import { useTopMenu } from '~/store/topMenu';
import { TOP_MENU } from '~/context/tools'
const topMenu = useTopMenu()

const menu = ref(null)
onMounted(() => {
  topMenu.menuRef = menu.value
})
</script>

<template>
  <div v-show="topMenu.visable" ref="menu" absolute display="flex" py="5px" items="center" z="100"
    class="card-container" left="500px" top="100px" :style="topMenu.position">
    <div w="30px" h="30px" class='card-icon' mx="7px" v-for="menu in TOP_MENU" :key="menu.type"
      @click.stop="menu.event">
      <i icon-btn :class="menu.icon" text="5" shadow="2xl" />
    </div>
  </div>
</template>
