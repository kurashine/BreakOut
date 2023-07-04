import React from 'react';

export default function Paddle({ x, y, width, height, fill }) {
  return <rect x={x} y={y} width={width} height={height} fill={fill} />;
}