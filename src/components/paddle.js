import React from 'react';

const Paddle = ({ x, y, width, height, paddleColor }) => {
  return <rect className="paddle" x={x} y={y} width={width} height={height} fill={paddleColor} />;
};

export default Paddle;
