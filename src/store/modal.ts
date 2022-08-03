import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
  state: () => ({
    visable: false,
  }),
})
