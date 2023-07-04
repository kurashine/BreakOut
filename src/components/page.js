import React, { useRef, useEffect, useState } from 'react';
import Scene from './scene';
import Menu from './menu';
import { registerListener } from '../utils';

export default function Page({ initialBallColor }) {
  const [gameStarted, setGameStarted] = useState(false);
  const sceneContainerRef = useRef(null);
  const [sceneSize, setSceneSize] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);

  const [ballColor, setBallColor] = useState(initialBallColor);
  const [paddleColor, setPaddleColor] = useState('#ffffff');

  useEffect(() => {
    if (!gameStarted) {
      return;
    }

    const onResize = () => {
      const { width, height } = sceneContainerRef.current.getBoundingClientRect();
      setSceneSize({ width, height });
    };

    const unregisterResizeListener = registerListener('resize', onResize);

    onResize();

    return () => {
      unregisterResizeListener();
    };
  }, [gameStarted]);

  function handleStartGame(level, ballColor, paddleColor) {
    console.log('Selected Level:', level);
    console.log('Ball Color:', ballColor);
    console.log('Paddle Color:', paddleColor);
    setGameStarted(true);
  }

  return (
    <div className="page">
      {!gameStarted && (
        <Menu
          onStartGame={handleStartGame}
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
          ballColorSetter={(color) => setBallColor(color)}
          paddleColorSetter={(color) => setPaddleColor(color)}
        />
      )}

      <div className="content">
        {gameStarted && (
          <div className="scene-container" ref={sceneContainerRef}>
            {sceneSize && (
              <Scene
                containerSize={sceneSize}
                currentLevel={selectedLevel}
                ballColor={ballColor}
                paddleColor={paddleColor}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}