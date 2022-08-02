import { defineStore } from 'pinia'
export const useRightPanel = defineStore('right-panel', {
  state: () => ({
    currentMeme: '',
    x: 0,
    y: 0,
  }),
})
