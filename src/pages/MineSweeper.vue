
<script setup lang="ts">
import { Game } from '../composables/game'
import MineBlock from '../components/MineBlock.vue'
import { isDev, toggoleDev } from '../composables/dev'

const game = new Game(10, 10)
const boxWidth = computed(() => `${game.width * 2.25}rem`)
function reset() {
  game.initialState()
}
function hint() {
  toggoleDev()
}

</script>
<template>
  <div class="flex items-center justify-center gap-5">
    <button
      class="h10 w25 bg-violet-600 rounded my-10 text-white"
      @click="reset"
    >
      Reset
    </button>
    <button
      class="h10 w25 bg-violet-600 rounded my-10 text-white"
      @click="hint"
    >
      {{ isDev ? 'Hide' : 'Hint' }}
    </button>
  </div>
  <div class="h10 m2 flex items-center justify-center">
    <div v-if="game.play.value === 'defeat'" class=" text-red-500 dark:text-red-300">
      You are defeat !
    </div>
    <div v-if="game.play.value === 'victory'" class=" text-green-500 dark:text-green-300">
      You are victory !
    </div>
    <div v-if="game.play.value === 'check'" class=" text-gray-900 dark:text-gray-200">
      Please check !
    </div>
  </div>
  <div flex="~ wrap" mx-auto :style="{ width: boxWidth }" @contextmenu.prevent>
    <MineBlock
      v-for="block in game.state.value"
      :key="`${block.y}${block.x}`"
      :block="block"
      @click="game.open(block)"
      @contextmenu.prevent="game.flag(block)"
    />
  </div>
</template>
