import React from 'react';

const Level = ({ level, unit }) => (
  <text className='level' x={unit} y={unit * 2} fontSize={unit}>{`Рівень: ${level}`} </text>
);

export default Level;
