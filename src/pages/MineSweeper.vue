<script setup lang="ts">
import type { BlockState } from '../types'
const WIDTH = 5
const HEIGHT = 5

/**
 * 当前格子对应的坐标位置
 */
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]
const colorGroup = [
  'text-indigo-800',
  'text-green-800',
  'text-red-800',
  'text-yellow-800',
  'text-orange-800',
  'text-purple-800',
  'text-pink-800',
]
let mineGenerate = false
const dev = true

watchEffect(chackGameState)

const state = reactive(
  Array.from({ length: HEIGHT }, (_, y) =>
    Array.from({ length: WIDTH },
      (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        revealed: false,
      })),
  ),
)

function returnColor(block: BlockState) {
  if (block.isFlag)
    return 'bg-gray-400/30'

  if (block.revealed)
    return 'bg-gray-400/10'

  if (!block.revealed)
    return 'bg-gray-400/30 hover:bg-gray-100/30'

  return colorGroup[block.adjacentMines]
}
/**
 * 生成地雷
 * @param count 随机比例
 */
function generateMines(initial: BlockState) {
  for (const mine of state) {
    for (const block of mine) {
      if (Math.abs(initial.x - block.x) <= 1)
        continue
      if (Math.abs(initial.y - block.y) <= 1)
        continue
      block.isMine = Math.random() < 0.5
    }
  }
  generateAdjacentMines()
}
/**
 * 初始化周围雷的数量
 */
function generateAdjacentMines() {
  state.forEach((mine, y) => {
    mine.forEach((block, x) => {
      if (block.isMine) return
      // 循环计算周围雷的数量
      getSiblings(block).forEach((b) => {
        if (b.isMine)
          block.adjacentMines++
      })
    })
  })
}

function getSiblings(block: BlockState) {
  return directions.map(([x, y]) => {
    const x2 = x + block.x
    const y2 = y + block.y
    // 判断是否越界
    if (x2 < 0 || x2 >= WIDTH || y2 < 0 || y2 >= HEIGHT)
      return null
    return state[y2][x2]
  })
    .filter(Boolean) as BlockState[]
}

function expendZero(block: BlockState) {
  if (block.adjacentMines) return
  getSiblings(block).forEach((b) => {
    if (!b.revealed && !b.adjacentMines) {
      b.revealed = true
      expendZero(b)
    }
  })
}
function chackGameState() {
  if (!mineGenerate) return
  const blocks = state.flat()
  if (blocks.every(i => (i.isFlag && i.isMine) || i.revealed))
    // eslint-disable-next-line no-alert
    alert('游戏胜利')
}

function onClick(block: BlockState) {
  if (block.isFlag) return
  if (!mineGenerate) {
    generateMines(block)
    mineGenerate = true
  }
  block.revealed = true
  if (block.isMine)
    // eslint-disable-next-line no-alert
    return alert('游戏结束')
  expendZero(block)
}
function onContextMenu(block: BlockState) {
  if (block.revealed) return
  block.isFlag = !block.isFlag
  chackGameState()
}
</script>

<template>
  <div class="m5">
    <div v-for="row, y in state" :key="y">
      <button
        v-for="block, x in row"
        :key="x"
        class="w-8 h-8 align-middle m.5 text-red"
        :class="returnColor(block)"
        @click="onClick(block)"
        @contextmenu.prevent="onContextMenu(block)"
      >
        <div v-if="block.isFlag" i-mdi-flag text-red-600 />
        <span v-else-if="block.revealed || dev">
          {{ block.isMine ? '💣' : block.adjacentMines || '' }}
        </span>
      </button>
    </div>
  </div>
</template>
