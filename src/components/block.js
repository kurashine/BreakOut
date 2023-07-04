
import React from 'react';

import { getRange } from '../utils';
import { BLOCK_MAX_DENSITY } from '../game/levels';

const colors = getRange(BLOCK_MAX_DENSITY).map(i => `rgba(153, 153, 153, ${1 / (BLOCK_MAX_DENSITY - i)})`);

const Block = ({ x, y, width, height, density, onBreak }) => {
  const handleBlockBreak = () => onBreak();

  return (
    <rect
      className='block'
      fill={colors[density]}
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={handleBlockBreak}
    />
  );
};

export default Block;
