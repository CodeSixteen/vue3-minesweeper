<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import MineBlock from '../components/MineBlock.vue'
import { GamePlay } from '../composables/logic'
import { isDev } from '../composables/dev'

const devToggle = useToggle(isDev)

const btnClass = 'text-gray-100 pt2 pb2 pl5 pr5 rounded bg-blue-500'

const game = new GamePlay(12, 12)

</script>

<template>
  <div class="m5">
    <div class="flex justify-center gap-5 mb5">
      <button :class="btnClass" @click="game.restart">
        新游戏
      </button>
      <button :class="btnClass" @click="devToggle()">
        {{ isDev ? '作弊中' : '提示' }}
      </button>
    </div>
    <div>
      <div v-for="row, y in game.state.value" :key="y">
        <MineBlock
          v-for="block, x in row"
          :key="x"
          :block="block"
          @click="game.onClick(block)"
          @contextmenu.prevent="game.onContextMenu(block)"
        />
      </div>
    </div>
  </div>
</template>
