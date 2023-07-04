import React from 'react';
import { getRange } from '../utils';

const Lives = ({ lives, containerWidth, unit }) => {
  const heartSize = unit * 1.5;
  const heartStyle = {
    fill: '#ff0000',
    stroke: '#333',
    strokeWidth: 2,
  };
  return getRange(lives).map((i) => (
    <svg
      className='life'
      viewBox="0 0 512 512"
      width={heartSize}
      height={heartSize}
      x={containerWidth - unit - heartSize * (i + 1) - (unit / 2) * i}
      y={unit}
      key={i}
    >
      <path
        style={heartStyle}
        d="M256,51.6c-47.8-48.6-125.5-48.6-173.3,0c-47.8,48.6-47.8,127.4,0,176.1l173.3,176.1L429.3,227.7
        C481.1,179,481.1,100.2,433.3,51.6C385.6,3,306.8,3,256,51.6z"
      />
    </svg>
  ));
};

export default Lives;
