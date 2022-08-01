<script setup lang="ts">
import type { Ref } from 'vue'
import { useLeftTools } from '~/store/leftTools'
const leftTools = useLeftTools()
const el: Ref<HTMLElement | null> = ref(null)
const { style } = useDraggable(el, {
  initialValue: { x: 100, y: 100 },
  preventDefault: true,
})
</script>

<template>
  <div
    ref="el" absolute display="flex" py="20px" flex="col" items="center" w="70px" z="100" cursor="move"
    :style="style" class="card-container"
  >
    <div
      v-for="(tool, index) in leftTools.tools" :key="tool.type" class="card-icon" w="50px" h="50px"
      :mb="leftTools.tools.length - 1 === index ? `` : `20px`" @click.stop="tool.event"
    >
      <i icon-btn :class="tool.icon" text="8" />
    </div>
  </div>
</template>
