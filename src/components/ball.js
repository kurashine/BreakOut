const Ball = ({ radius, ballColor }) => {
  return <circle className="ball" fill={ballColor} cx={radius} cy={radius} r={radius} />;
};

export default Ball;