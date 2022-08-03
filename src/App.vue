<script setup lang="ts">
import { useRightPanel } from './store/rightPanel'
const rightPanel = useRightPanel()

const el = ref<HTMLElement | null>(null)

function onDrop(e: DragEvent) {
  const { x, y } = e
  rightPanel.x = x
  rightPanel.y = y
}
</script>

<template>
  <main ref="el" font-sans text="center gray-700" @drop="onDrop">
    <div relative>
      <LeftToolsBar />
      <TopMenu />
      <Board />
      <RightMenu />
      <RightPanel />
      <Modal />
    </div>
  </main>
</template>
