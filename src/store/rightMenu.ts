import { defineStore } from "pinia";
import { Ref, StyleValue } from "vue";

export interface RightMenuState {
  menuRef: HTMLElement | null
  visable: boolean
  position: StyleValue | undefined
}

export interface RightMenuActions {
  showMenu: () => void
  visable: boolean
  position: StyleValue | undefined
}

export const useRightMenu = defineStore('right-menu', {
  state: () => ({
    menuRef: null,
    visable: false,
    position: {}
  }),
  actions: {
    showMenu() {
      this.visable = true
    },
    hideMenu() {
      this.visable = false
    }
  }
})

