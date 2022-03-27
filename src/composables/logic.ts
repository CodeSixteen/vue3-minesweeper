import type { BlockState } from './../types'
export class GamePlay {
  directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ]

  mineGenerate = false
  state = ref<BlockState[][]>([])
  constructor(public width: number, public height: number) {
    this.restart()
  }

  generateMines(initial: BlockState) {
    for (const mine of this.state.value) {
      for (const block of mine) {
        if (Math.abs(initial.x - block.x) <= 1)
          continue
        if (Math.abs(initial.y - block.y) <= 1)
          continue
        block.isMine = Math.random() < 0.5
      }
    }
    this.generateAdjacentMines()
  }

  generateAdjacentMines() {
    this.state.value.forEach((mine) => {
      mine.forEach((block) => {
        if (block.isMine) return
        // 循环计算周围雷的数量
        this.getSiblings(block).forEach((b) => {
          if (b.isMine)
            block.adjacentMines++
        })
      })
    })
  }

  getSiblings(block: BlockState) {
    return this.directions.map(([x, y]) => {
      const x2 = x + block.x
      const y2 = y + block.y
      // 判断是否越界
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height)
        return null
      return this.state.value[y2][x2]
    })
      .filter(Boolean) as BlockState[]
  }

  expendZero(block: BlockState) {
    if (block.adjacentMines) return
    this.getSiblings(block).forEach((b) => {
      if (!b.revealed) {
        b.revealed = true
        this.expendZero(b)
      }
    })
  }

  chackGameState() {
    if (!this.mineGenerate) return
    const blocks = this.state.value.flat()
    if (blocks.every(i => (i.isFlag && i.isMine) || i.revealed)) {
      // eslint-disable-next-line no-alert
      alert('游戏胜利')
    }
  }

  onClick(block: BlockState) {
    if (block.isFlag) return
    if (!this.mineGenerate) {
      this.generateMines(block)
      this.mineGenerate = true
    }
    block.revealed = true
    if (block.isMine)
    // eslint-disable-next-line no-alert
      return alert('游戏结束')
    this.expendZero(block)
  }

  onContextMenu(block: BlockState) {
    if (block.revealed) return
    block.isFlag = !block.isFlag
    this.chackGameState()
  }

  restart() {
    this.mineGenerate = false
    this.state.value = Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width },
        (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          revealed: false
        })))
  }
}
