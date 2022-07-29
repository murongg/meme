import { defineStore } from 'pinia'
import { LEFT_TOOLS } from '~/context/tools'

export const useLeftTools = defineStore('left-tools', {
  state: () => ({
    tools: LEFT_TOOLS,
  }),
})
