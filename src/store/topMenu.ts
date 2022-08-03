import { defineStore } from 'pinia'
import type { StyleValue } from 'vue'

export interface TopMenuState {
  menuRef: HTMLElement | null
  visable: boolean
  position: StyleValue | undefined
}

export interface TopMenuActions {
  showMenu: () => void
  visable: boolean
  position: StyleValue | undefined
}

export const useTopMenu = defineStore('top-menu', {
  state: () => ({
    menuRef: null,
    visable: false,
    position: {},
    upperDisabled: false,
    lowerDisabled: false,
  }),
  actions: {
    showMenu() {
      this.visable = true
    },
    hideMenu() {
      this.visable = false
    },
  },
})

