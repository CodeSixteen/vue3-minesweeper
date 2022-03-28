import type { BlockState } from '../types'

const indicators = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

export class Game {
  width: number
  height: number
  isGenerated = false
  state = ref<BlockState[]>([])
  play = ref<'play'|'defeat'|'victory'|'check'>('play')

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.initialState()
    watchEffect(() => {
      if (this.state.value.some(block => block.isMine && block.isOpen))
        return this.play.value = 'defeat'
      if (this.state.value.every(block => (block.isFlag && block.isMine) || block.isOpen))
        return this.play.value = 'victory'
      if (this.state.value.every(block => block.isFlag || block.isOpen))
        return this.play.value = 'check'
    })
  }

  initialState() {
    this.isGenerated = false
    this.play.value = 'play'
    this.state.value = Array.from({ length: this.height * this.width }, (_, index) => ({
      y: Math.floor(index / this.width) + 1,
      x: index % this.width + 1,
      adjacentMines: 0
    }))
  }

  generateMines(initialBlock: BlockState) {
    const adjacentBlocks = this.getAdjacentBlocks(initialBlock)
    this.state.value.forEach((block) => {
      const b = adjacentBlocks.length > 0 ? adjacentBlocks[0] : ''
      if (b && b.x === block.x && b.y === block.y) {
        adjacentBlocks.shift()
        return
      }
      if (initialBlock.x === block.x && initialBlock.y === block.y)
        return
      block.isMine = Math.random() < 0.2
    })
    this.generateAdjacentMines()
  }

  getAdjacentBlocks(block: BlockState): BlockState[] {
    return indicators.map(([dx, dy]) => {
      const x = block.x + dx
      const y = block.y + dy
      if (x < 1 || x > this.width || y < 1 || y > this.height)
        return null
      else
        return this.state.value[(y - 1) * this.width + (x - 1)]
    })
      .filter(Boolean) as BlockState[]
  }

  generateAdjacentMines() {
    this.state.value.forEach((block) => {
      this.getAdjacentBlocks(block)
        .forEach((adjacentBlock) => {
          if (adjacentBlock.isMine)
            block.adjacentMines++
        })
    })
  }

  openZero(block: BlockState) {
    if (block.isOpen)
      return
    block.isOpen = true
    if (block.adjacentMines === 0) {
      this.getAdjacentBlocks(block)
        .forEach((adjacentBlock) => {
          if (adjacentBlock.isOpen)
            return
          this.openZero(adjacentBlock)
        })
    }
  }

  open(block: BlockState) {
    if (this.play.value !== 'play')
      return
    if (block.isOpen)
      return
    if (block.isFlag)
      return
    if (!this.isGenerated) {
      this.isGenerated = true
      this.generateMines(block)
      this.openZero(block)
    }

    if (block.adjacentMines === 0)
      this.openZero(block)
    block.isOpen = true

    if (block.isMine) {
      this.state.value.forEach((block) => {
        if (block.isMine)
          block.isOpen = true
      })
    }
  }

  flag(block: BlockState) {
    if (this.play.value !== 'play')
      return
    if (block.isOpen)
      return
    block.isFlag = !block.isFlag
  }
}
