import { getRange } from '../utils'

export const BLOCK_MAX_DENSITY = 3

const getRandomBlock = () => Math.floor(Math.random() * BLOCK_MAX_DENSITY)

const getBlocks = (rows, columns) =>
  getRange(rows).map(() => getRange(columns).map(getRandomBlock))

export const LEVELS = [
  {
    lives: 3,
    paddleWidth: 2,
    speed: 1.3,
    blocks: getBlocks(4, 8)

  },
  {
    lives: 3,
    paddleWidth: 2,
    speed: 1.6,
    blocks: getBlocks(4, 7)
  },
  {
    lives: 3,
    paddleWidth: 2,
    speed: 2,
    blocks: getBlocks(4, 7)
  },
  {
    lives: 4,
    paddleWidth: 2,
    speed: 2.5,
    blocks: getBlocks(4, 7)
  },
  {
    lives: 5,
    paddleWidth: 2,
    speed: 3,
    blocks: getBlocks(4, 7)
  }
]
