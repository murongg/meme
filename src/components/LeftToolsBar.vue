<script setup lang="ts">
import { useLeftTools } from '~/store/leftTools';
import { Ref } from 'vue'
const leftTools = useLeftTools()
const el: Ref<HTMLElement | null> = ref(null)
const { style } = useDraggable(el, {
  initialValue: { x: 100, y: 100 },
  preventDefault: true,
})
</script>

<template>
  <div ref="el" absolute display="flex" py="20px" flex="col" items="center" w="70px" bg="#f5f5f5" z="100" left="100px"
    top="100px" rounded="4" shadow="2xl" border="1" cursor="pointer" :style="style">

    <div w="50px" h="50px" display="flex" justify="center" items="center"
      :mb="leftTools.tools.length - 1 === index ? `` : `20px`" bg="#ffffff" rounded="2" shadow="2xl"
      v-for="(tool, index) in leftTools.tools" @click.stop="tool.event" :key="tool.type">
      <i icon-btn :class="tool.icon" text="8"></i>
    </div>

  </div>
</template>
