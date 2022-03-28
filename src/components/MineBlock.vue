
<script setup lang="ts">
import type { BlockState } from '../types'
import { isDev } from '../composables/dev'
const props = defineProps<{
  block: BlockState
}>()

const textColors = [
  'text-purple-500/80',
  'text-yellow-500/80',
  'text-blue-500/80',
  'text-green-500/80',
  'text-orange-500/80',
  'text-violet-500/80',
  'text-red-500/80',
  'text-gray-500/80'
]

const getTextClass = computed(() => {
  if (props.block.isFlag)
    return 'bg-gray-400/50'

  const str = props.block.isOpen
    ? 'bg-gray-400/20'
    : 'bg-gray-400/50 hover:bg-gray-400/20'
  return `${str} ${textColors[props.block.adjacentMines - 1]}`
})
</script>
<template>
  <button
    class="h8 w8 m.5 flex justify-center items-center border-1 border-gray-300/20"
    :class="getTextClass"
  >
    <div v-if="block.isFlag" i="mdi-flag" text-red-500 />
    <div v-else-if="block.isOpen || isDev">
      {{ block.isMine ? '💣' : block.adjacentMines ? block.adjacentMines : '' }}
    </div>
  </button>
</template>
