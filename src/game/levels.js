import { getRange } from '../utils';

export const BLOCK_MAX_DENSITY = 3;

const getRandomBlock = () => Math.floor(Math.random() * BLOCK_MAX_DENSITY);

const getBlocks = (rows, columns) =>
  getRange(rows).map(() => getRange(columns).map(getRandomBlock));

export const LEVELS = [
  {
    level: 1,
    lives: 3,
    image: require('../images/bgs1.jpg'),
    paddleWidth: 2.7,
    speed: 0.6,
    blocks: getBlocks(4, 8),
  },
  {
    level: 2,
    lives: 3,
    image: require('../images/bgs2.jpg'),
    paddleWidth: 2.7,
    speed: 0.8,
    blocks: getBlocks(4, 8),
  },
  {
    level: 3,
    lives: 3,
    image: require('../images/bgs3.jpg'),
    paddleWidth: 2.7,
    speed: 1,
    blocks: getBlocks(4, 8),
  },
  {
    level: 4,
    lives: 3,
    image: require('../images/bgs4.jpg'),
    paddleWidth: 2.7,
    speed: 1.2,
    blocks: getBlocks(5, 9),
  },
  {
    level: 5,
    lives: 4,
    image: require('../images/bgs5.jpg'),
    paddleWidth: 2.7,
    speed: 1.4,
    blocks: getBlocks(5, 9),
  },
  {
    level: 6,
    lives: 4,
    image: require('../images/bgs6.jpg'),
    paddleWidth: 2.7,
    speed: 2,
    blocks: getBlocks(6, 9),
  },
];
