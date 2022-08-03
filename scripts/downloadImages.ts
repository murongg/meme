import { join } from 'path'
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import download from 'download'

const BASE_URL = 'http://www.wakatool.com/material/v12'
const BASE_PATH = join(__dirname, '..', 'public', 'data')
const IMAGE_PATH = join(__dirname, '..', 'public', 'images')

async function downloadImage(url: string, path: string) {
  const fileName = url.split('/').pop() || ''
  if (isFile(join(path, fileName))) {
    console.log(`${join(path, fileName)}   exists`)
    return
  }
  console.log(`${url}  downloading...`)
  await download(encodeURI(url), path)
  console.log(`${url}  downloading end`)
}

async function readDirDeep(path: string) {
  if (isDirectory(path)) {
    const dirs = readdirSync(path)
    for (const dir of dirs)
      readDirDeep(join(path, dir))
  }
  else if (isFile(path)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const json = require(path)
    for await (const meme of json.materials) {
      const memePath = meme.path
      let dirs = (meme.path as string).replace(BASE_URL, '').split('/')
      dirs.pop()
      dirs = dirs.filter(item => !!item)
      const imagePath = dirs.join('/')
      await downloadImage(memePath, join(IMAGE_PATH, imagePath))
      meme.path = `/images${(meme.path as string).replace(BASE_URL, '')}`
    }
    writeFile(path, JSON.stringify(json, null, 2))
  }
}

function isDirectory(path: string) {
  return existsSync(path) && statSync(path).isDirectory()
}

function isFile(path: string) {
  return existsSync(path) && statSync(path).isFile()
}

function writeFile(path: string, content: string) {
  if (!existsSync(path))
    mkdirSync(path)

  writeFileSync(path, content)
  console.log(`write ${path} done`)
}

readDirDeep(BASE_PATH)
