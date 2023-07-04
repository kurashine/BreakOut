import React from 'react';

let Ball = ({ x, y, radius, ballColor, speed }) => (
  <circle className="ball" cx={x} cy={y} r={radius} fill={ballColor} speed={speed} />
);

export default Ball;
