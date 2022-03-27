<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const onToggle = useToggle(isDark)
function toggleDark() {
  onToggle()
}
</script>

<template>
  <div class="flex justify-center text-8 mt20 gap-5 text-gray-400">
    <button class="hover:text-indigo-700 dark:hover:text-indigo-300" @click="toggleDark">
      <div i="carbon-sun dark:carbon-moon" />
    </button>
    <a class="hover:text-indigo-700 dark:hover:text-indigo-300" href="https://github.com/CodeSixteen">
      <div i="mdi-github" />
    </a>
  </div>
</template>
