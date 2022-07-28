<script setup lang="ts">
import type { Ref } from 'vue'
import { useBoard } from '~/context/board'

const canvas: Ref<HTMLCanvasElement | null> = ref(null)

onMounted(() => {
  const { init } = useBoard()
  init(canvas.value!)
})
</script>

<template>
  <canvas ref="canvas" w-screen h-screen />
</template>
