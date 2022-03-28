<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const onToggle = useToggle(isDark)
const btnClass = 'hover:text-gray-700 dark:hover:text-gray-100'
</script>

<template>
  <div class="flex justify-center gap-5 p10 text-gray-400 text-5">
    <button
      :class="btnClass"
      title="Toggle dark mode"
      @click="onToggle()"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button>
    <a
      :class="btnClass"
      title="GitHub"
      href="https://github.com/CodeSixteen/vue3-minesweeper"
    >
      <div i="mdi-github" />
    </a>
  </div>
</template>
