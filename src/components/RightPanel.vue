<script setup lang="ts">
const show = ref(true)
</script>

<template>
  <Transition name="custom-classes-transition" enter-active-class="animate__animated animate__fadeInRight"
    leave-active-class="animate__animated animate__fadeOutRight">
    <div v-show="show" class="card-container" w="400px" px="20px" py="20px" h="screen" absolute right="0" top="0"
      bg-white>
      <MemeSelector />
    </div>
  </Transition>
  <button
    :class="show ? 'i-material-symbols-arrow-circle-right-outline' : 'i-material-symbols-arrow-circle-left-outline'"
    icon-btn absolute @click="show = !show" transition duration-2000 ease-in-out :right="show ? `420px` : `20px`"
    top="50%" mt="-1.5rem" rounded-full text-4xl></button>
</template>
