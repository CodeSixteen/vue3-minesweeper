
<script setup lang="ts">
import type { BlockState } from '../types'
import { isDev } from '../composables/dev'

const props = defineProps<{
  block: BlockState
}>()

const colorGroup = [
  'text-indigo-800',
  'text-green-800',
  'text-red-800',
  'text-yellow-800',
  'text-orange-800',
  'text-purple-800',
  'text-pink-800'
]
function returnColor(block: BlockState) {
  if (block.isFlag)
    return 'bg-gray-400/30'

  if (block.revealed)
    return 'bg-gray-400/10'

  if (!block.revealed)
    return 'bg-gray-400/30 hover:bg-gray-100/30'

  return colorGroup[block.adjacentMines]
}
</script>

<template>
  <button
    class="w-8 h-8 align-middle m.5 text-red"
    :class="returnColor(block)"
  >
    <div v-if="block.isFlag" i-mdi-flag text-red-600 />
    <span v-else-if="block.revealed || isDev">
      {{ block.isMine ? '💣' : block.adjacentMines || '' }}
    </span>
  </button>
</template>
