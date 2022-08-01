import fs from 'fs'
import { join } from 'path'
import axios from 'axios'
import rimraf from 'rimraf'
import { CATEGORYS } from '~/constants/data'

const BASE_URL = 'https://www.wakatool.com/maker/material'
const ERROR_OK = 200
const BASE_PATH = join(__dirname, '..', 'public', 'data')

function createDir(path: string) {
  if (!fs.existsSync(path))
    fs.mkdirSync(path)

  console.log(`create ${path} done`)
}

function createBaseDir() {
  createDir(BASE_PATH)
}

function clearBasePath() {
  return new Promise((resolve) => {
    rimraf(BASE_PATH, resolve)
  })
}

function writeFile(path: string, content: string) {
  if (!fs.existsSync(path))
    fs.mkdirSync(path)

  fs.writeFileSync(join(path, 'index.json'), content)
  console.log(`write ${path} done`)
}

async function generator() {
  await clearBasePath()
  createBaseDir()
  for await (const cate of CATEGORYS) {
    console.log(`${cate} request start`)
    createDir(join(BASE_PATH, cate))
    const cate1s = await getData(cate)
    writeFile(join(BASE_PATH, cate), JSON.stringify(cate1s, null, 2))
    for await (const { cate2 } of cate1s.categories) {
      const cate2s = await getData(cate, cate2)
      const dir = join(BASE_PATH, cate, cate2)
      createDir(dir)
      writeFile(dir, JSON.stringify(cate2s, null, 2))
    }
    console.log(`${cate} request end`)
  }
  console.log('done')
}

async function getData(cate1: string, cate2 = '') {
  const res = await axios.get(BASE_URL, {
    params: {
      cate1,
      cate2,
    },
  })
  if (res.status === ERROR_OK) {
    const data = res.data
    return data
  }
}

generator()
