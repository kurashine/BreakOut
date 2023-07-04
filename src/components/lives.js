import React from 'react';
import { getRange } from '../utils';

const Lives = ({ lives, containerWidth, unit }) => {
  const width = unit * 2;
  const heartStyle = {
    fill: '#e91e63',
    stroke: '#333',
    strokeWidth: 2,
  };
  return getRange(lives).map(i => (
    <svg
      className='life'
      viewBox="0 0 512 512"
      width={width}
      height={unit}
      x={containerWidth - unit - width * (i + 1) - (unit / 2) * i}
      y={unit}
      key={i}
    >
      <path
        style={heartStyle}
        d="M402.2,51.6c-41.5-41.5-108.9-41.5-150.4,0L256,90.5l-16.7-16.7
          c-41.5-41.5-108.9-41.5-150.4,0c-41.5,41.5-41.5,108.9,0,150.4l16.7,16.7L256,421.7l134.7-134.7l16.7-16.7
          C443.7,160.5,443.7,93.1,402.2,51.6z"
      />
    </svg>
  ))
};
export default Lives;
