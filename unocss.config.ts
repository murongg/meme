import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['card-container', 'bg-[#f5f5f5] rounded-4 shadow-2xl border-1 border-color-light opacity-90 transition duration-200 ease-in-out hover:opacity-100'],
    ['card-icon', 'flex justify-center items-center bg-white rounded-2 shadow-2xl opacity-90 transition duration-200 ease-in-out hover:opacity-100']
  ],
  safelist: ['i-bxs-pointer', 'i-bxs-pencil', 'i-material-symbols-text-fields-rounded', 'i-bx-undo', 'i-bx-redo', 'i-carbon-clean', 'i-material-symbols-arrow-upward', 'i-material-symbols-arrow-downward', 'i-material-symbols-delete-outline'],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
