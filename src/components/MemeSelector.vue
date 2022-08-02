<script setup lang="ts">
import { fabric } from 'fabric'
import { CATEGORYS } from '~/constants/data'
import { useBoard } from '~/context/board';
import { useRightPanel } from '~/store/rightPanel';

const currentIndex = ref(0)
const currentCategoryIndex = ref(0)
const categories = ref<any[]>([])
const materials = ref<any[]>([])
const isFinished = ref(false)

const { canvas } = useBoard()
const rightPanel = useRightPanel()

function itemClick(index: number) {
  currentIndex.value = index
  getData(CATEGORYS[index])
  currentCategoryIndex.value = 0
}

function categoryClick(index: number, cate: string) {
  currentCategoryIndex.value = index
  getData(CATEGORYS[currentIndex.value], cate)
}

async function getData(cate: string, cate2 = '') {
  isFinished.value = false
  let url = `/data/${cate}`
  if (cate2)
    url += `/${cate2}/index.json`
  else
    url += '/index.json'

  const fetch = await useFetch(url).json
  const { data } = await fetch()
  isFinished.value = true
  materials.value = data.value.materials
  categories.value = data.value.categories
}

onMounted(() => {
  getData(CATEGORYS[currentIndex.value])
})

const { list: categoryList, containerProps: categoryContainerProps, wrapperProps: categoryWrapperProps } = useVirtualList(
  categories,
  {
    itemHeight: 23,
  },
)

function onDrag(event: DragEvent, data: any) {
  let imgElement = document.createElement('img')
  imgElement.src = data.path
  imgElement.onload = () => {
    const image = new fabric.Image(imgElement)
    const imageSize = 200
    const left = rightPanel.x - imageSize / 2
    const top = rightPanel.y - imageSize / 2
    image.scale(imageSize / image.width!).set(
      {
        angle: 0,
        padding: 10,
        left,
        top
      }
    )
    toRaw(canvas.value)?.add(image)
  }
}

</script>

<template>
  <div overflow="hidden" h="screen">
    <ul flex w="full" mb="10px">
      <li v-for="(category, index) in CATEGORYS" :key="category" w="20%" cursor="pointer"
        :text="currentIndex === index && `teal-700`" :border-r="index !== CATEGORYS.length - 1 && `1`"
        border-color="light" @click="itemClick(index)">
        {{ category }}
      </li>
    </ul>
    <div flex>
      <div v-bind="categoryContainerProps as any" important-w="30%">
        <ul v-bind="categoryWrapperProps" overflow-y="scroll" important-h="760px">
          <li v-for="(data, index) in categoryList" :key="data.data.path" h="40px" leading="40px" border-color="light"
            cursor="pointer" :text="currentCategoryIndex === index && `teal-700`"
            :border-b="index !== CATEGORYS.length - 1 && `1`" @click="categoryClick(index, data.data.cate2)">
            {{ data.data.cate2 }}
          </li>
        </ul>
      </div>
      <div important-w="70%" overflow-y="auto" v-if="isFinished">
        <ul overflow-y="scroll" h="760px" text="left">
          <li v-for="data in materials" :key="data.path" cursor="pointer" inline-block w="50%" px="2%" py="%2" mb="10px"
            box-border v="middle">
            <img v-lazy="data.path" draggable @dragend="onDrag($event, data)">
          </li>
        </ul>
      </div>
      <span v-else>loading</span>
    </div>
  </div>
</template>
