export interface BlockState {
  isMine?: boolean // 是否是地雷
  revealed?: boolean // 是否已经打开
  isFlag?: boolean // 是否已经标记
  adjacentMines: number // 邻居地雷数量
  x: number // x坐标
  y: number // y坐标
}
