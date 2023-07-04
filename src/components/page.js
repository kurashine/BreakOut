import React, { useRef, useEffect, useState } from 'react';
import Scene from './scene';
import Menu from './menu';
import { registerListener } from '../utils';
import { LEVELS } from '../game/levels';

export default function Page({ initialBallColor, fontSizeSetter }) {
  const [gameStarted, setGameStarted] = useState(false);
  const sceneContainerRef = useRef(null);
  const [sceneSize, setSceneSize] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [ballSpeed, setBallSpeed] = useState(1);
  const [ballColor, setBallColor] = useState(initialBallColor);
  const [paddleColor, setPaddleColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(28);
  const [imagePath, setImagePath] = useState(null);


  useEffect(() => {
    if (!gameStarted) {
      return;
    }


    const handleResize = () => {
      const { width, height } = sceneContainerRef.current.getBoundingClientRect();
      setSceneSize({ width, height });
    };

    handleResize();

    const unregisterResizeListener = registerListener('resize', handleResize);

    return () => {
      unregisterResizeListener();
    };
  }, [gameStarted]);

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  const handleBallSpeedChange = (speed) => {
    setBallSpeed(speed);
  };


  const handleStartGame = (level, ballColor, paddleColor) => {
    setGameStarted(true);
    setSelectedLevel(level);
    setBallColor(ballColor);
    setPaddleColor(paddleColor);

    const selectedLevelData = LEVELS.find((item) => item.level === level);

    if (selectedLevelData) {
      setImagePath(selectedLevelData.image);
      setBallSpeed(selectedLevelData.ballSpeed);
    }
  };





  return (
    <div className='page' style={{ backgroundImage: `url(${imagePath})`, backgroundSize: 'cover', fontSize: `${fontSize}px` }}>
      <div className='page'>
        {!gameStarted && (
          <Menu
            onStartGame={handleStartGame}
            selectedLevel={selectedLevel}
            ballColorSetter={setBallColor}
            paddleColorSetter={setPaddleColor}
            fontSizeSetter={setFontSize}
            onLevelChange={handleLevelChange}
            ballSpeedSetter={handleBallSpeedChange}
          />
        )}


        <div className='content'>
          {gameStarted && (
            <div className='scene-container' ref={sceneContainerRef}>
              {sceneSize && (
                <Scene containerSize={sceneSize} ballColor={ballColor} paddleColor={paddleColor} selectedLevel={selectedLevel} ballSpeed={ballSpeed} />

              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}