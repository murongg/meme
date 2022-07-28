import { defineStore } from "pinia";
import { LEFT_TOOLS } from "~/contants/tools";


export const useLeftTools = defineStore('left-tools', {
  state: () => ({
    tools: LEFT_TOOLS
  })
})
