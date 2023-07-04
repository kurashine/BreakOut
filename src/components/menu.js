import React, { useState, useEffect } from 'react';
import '../index.css';
import { LEVELS } from '../game/levels';


const Menu = ({
    onStartGame,
    setSelectedLevel,
    selectedLevel,
    ballColorSetter,
    paddleColorSetter,
}) => {
    const [hovered, setHovered] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [ballColor, setBallColor] = useState('#ffff');
    const [paddleColor, setPaddleColor] = useState('#ffff');

    useEffect(() => {
        ballColorSetter(ballColor);
    }, [ballColor, ballColorSetter]);

    useEffect(() => {
        paddleColorSetter(paddleColor);
    }, [paddleColor, paddleColorSetter]);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleStartGame = () => {
        if (onStartGame) {
            onStartGame(selectedLevel, ballColor, paddleColor);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const handleLevelSelect = (event) => {
        const level = parseInt(event.target.value);
        setSelectedLevel(level);
    };

    const handleBallColorChange = (event) => {
        const color = event.target.value;
        setBallColor(color);
        ballColorSetter(color);
    };

    const handlePaddleColorChange = (event) => {
        setPaddleColor(event.target.value);
    };

    return (
        <div className="menu-container">
            <div className="logo">
                <h1 className="text">BREAK OUT</h1>
            </div>
            <div className="menu">
                <div
                    className={`menu-item ${hovered ? 'hovered' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleStartGame}
                >
                    Грати
                </div>
                <div className="menu-item" onClick={toggleSettings}>
                    Налаштування
                </div>
                {showSettings && (
                    <div className="settings">
                        <div className="setting">
                            <label htmlFor="ball-color">Колір м'яча:</label>
                            <input
                                type="color"
                                id="ball-color"
                                value={ballColor}
                                onChange={handleBallColorChange}
                            />
                        </div>
                        <div className="setting">
                            <label htmlFor="paddle-color">Колір платформи:</label>
                            <input
                                type="color"
                                id="paddle-color"
                                value={paddleColor}
                                onChange={handlePaddleColorChange}
                            />
                        </div>
                        <div className="setting">
                            <label htmlFor="level-select">Рівень:</label>
                            <select
                                id="level-select"
                                value={selectedLevel}
                                onChange={handleLevelSelect}
                            >
                                {LEVELS.map((level) => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <style>
                {`
        .ball {
          fill: var(--ball-color);
        }
    
        .paddle {
          fill: var(--paddle-color);
        }
      `}
            </style>
        </div>
    );
};

export default Menu;
