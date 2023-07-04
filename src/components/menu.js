import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';
import { LEVELS } from '../game/levels';
import axios from 'axios';
import onSpeedChange from './speed';

const Menu = ({
    onStartGame,
    ballColorSetter,
    paddleColorSetter,
    fontSizeSetter,
    ballSpeedSetter
}) => {
    const [hovered, setHovered] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [ballColor, setBallColor] = useState('#FFFFFF');
    const [paddleColor, setPaddleColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(28);
    const [showHelp, setShowHelp] = useState(false);
    const [fullScreenHelp, setFullScreenHelp] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [users, setUsers] = useState([]);
    const [showCreatePlayer, setShowCreatePlayer] = useState(false);
    const [selectedSpeed, setSelectedSpeed] = useState(1);
    const [levelSpeed, setLevelSpeed] = useState(LEVELS[0].speed);
    const [newPlayerName, setNewPlayerName] = useState('');
    const [newPlayerAge, setNewPlayerAge] = useState('');
    const [_isDatabaseCleared, setIsDatabaseCleared] = useState(false);

    useEffect(() => {
        ballColorSetter(ballColor);
    }, [ballColor, ballColorSetter]);

    useEffect(() => {
        onSpeedChange(levelSpeed);
    }, [levelSpeed]);

    useEffect(() => {
        paddleColorSetter(paddleColor);
    }, [paddleColor, paddleColorSetter]);

    useEffect(() => {
        fontSizeSetter(fontSize);
    }, [fontSize, fontSizeSetter]);

    useEffect(() => {
        axios
            .get('http://localhost:3001/user')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [showRating]);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleClearDatabase = () => {
        axios
            .delete('http://localhost:3001/user')
            .then(response => {
                setIsDatabaseCleared(true);
                console.log('База данных успешно очищена');
                setUsers([]); // Очистка рейтинга
            })
            .catch(error => {
                console.error('Ошибка при очистке базы данных:', error);
            });
    };


    const toggleRating = () => {
        setShowRating(!showRating);
        setShowHelp(false);
        setShowSettings(false);
    };

    const toggleHelp = () => {
        setShowHelp(!showHelp);
        setShowRating(false);
        setShowSettings(false);
    };

    const handleStartGame = () => {
        if (onStartGame) {
            setFullScreenHelp(false);
            setShowCreatePlayer(true);
        }
    };

    const handleStart = useCallback(() => {
        const speed = parseInt(selectedSpeed, 10);

        onStartGame(speed, ballColor, paddleColor);
        const data = {
            name: newPlayerName,
            age: newPlayerAge,
            score: 0
        };

        axios.post('http://localhost:3001/user', data)
            .then(response => {
                console.log('Успішно додано нового гравця:', response.data);
            })
            .catch(error => {
                console.error('Помилка при додаванні нового гравця:', error);
            });
    }, [
        onStartGame,
        selectedSpeed,
        ballColor,
        paddleColor,
        newPlayerName,
        newPlayerAge,
    ]);




    const toggleSettings = () => {
        setShowSettings(!showSettings);
        setShowHelp(false);
    };


    const handleSpeedChange = (event) => {
        const speed = parseInt(event.target.value, 10);
        setSelectedSpeed(speed);
        setLevelSpeed(LEVELS[speed - 1].speed);
    };

    const handleBallColorChange = (event) => {
        const color = event.target.value;
        setBallColor(color);
        ballColorSetter(color);
        document.documentElement.style.setProperty('--ball-color', color);
    };

    const handlePaddleColorChange = (event) => {
        const color = event.target.value;
        setPaddleColor(color);
        paddleColorSetter(color);
        document.documentElement.style.setProperty('--paddle-color', color);
    };

    const handleFontSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        setFontSize(newSize);
        document.documentElement.style.setProperty('--font-size', `${newSize}px`);
    };



    const handleBackClick = () => {
        setShowSettings(false);
        setShowHelp(false);
        setShowRating(false);
        setShowCreatePlayer(false);
    };


    return (
        <div className={`menu-container ${fullScreenHelp ? 'full-screen-help' : ''}`}>
            {!showHelp && !showSettings && !showRating && !showCreatePlayer && (
                <div className="logo"></div>
            )}
            {!showHelp && !showSettings && !showRating && !showCreatePlayer && (
                <div className="menu">
                    {!showSettings && (
                        <div
                            className={`menu-item ${hovered ? 'hovered' : ''}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleStartGame}
                        >
                            Грати
                        </div>
                    )}
                    {!showHelp && !showSettings && !showRating && (
                        <div className="menu-item" onClick={toggleSettings}>
                            Налаштування
                        </div>
                    )}
                    {!showHelp && !showSettings && !showRating && (
                        <div className="menu-item" onClick={toggleRating}>
                            Рейтинг
                        </div>
                    )}

                    {!showHelp && !showSettings && !showRating && (
                        <div className="menu-item" onClick={toggleHelp}>
                            Довідка
                        </div>
                    )}
                </div>
            )}

            {showCreatePlayer && (
                <div className="create-player">
                    <h2> Нова гра</h2>
                    <div>
                        <input
                            className="create-user"
                            type="text"
                            placeholder="Ім'я"
                            value={newPlayerName}
                            onChange={e => setNewPlayerName(e.target.value)}
                        />
                        <input
                            className="create-user"
                            type="number"
                            placeholder="Вік"
                            value={newPlayerAge}
                            onChange={e => setNewPlayerAge(Number(e.target.value))}
                        />
                        <div className="create-level">
                            <label htmlFor="level"></label>
                            <select htmlFor="speed" value={selectedSpeed} onChange={handleSpeedChange}>
                                <option value={1}>Рівень 1</option>
                                <option value={2}>Рівень 2</option>
                                <option value={3}>Рівень 3</option>
                                <option value={4}>Рівень 4</option>
                                <option value={5}>Рівень 5</option>
                                <option value={6}>Рівень 6</option>
                            </select>
                        </div>
                        <button className="contine" onClick={handleStart}>Продовжити</button></div>


                    <button className="menu-item-back" onClick={handleBackClick}>
                        ❮
                    </button>
                </div>
            )}

            {showSettings && (
                <div className="settings">
                    <h2>Налаштування</h2>


                    <div className="setting">
                        <label htmlFor="ballColor">Колір м'яча:</label>
                        <input type="color" id="ballColor" value={ballColor} onChange={handleBallColorChange} />
                    </div>
                    <div className="setting">
                        <label htmlFor="paddleColor">Колір платформи:</label>
                        <input type="color" id="paddleColor" value={paddleColor} onChange={handlePaddleColorChange} />
                    </div>
                    <div className="setting">
                        <label htmlFor="fontSize">Розмір шрифту:</label>
                        <input
                            type="range"
                            id="font-size"
                            min="26"
                            max="44"
                            step="2"
                            value={fontSize}
                            onChange={handleFontSizeChange}
                        />

                    </div>
                    <button className="menu-item-back" onClick={handleBackClick}>
                        ❮
                    </button>
                </div>
            )}
            {showRating && (
                <div className='rating'>
                    <h2>Рейтинг</h2>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ім'я</th>
                                    <th>Вік</th>
                                    <th>Рахунок</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.age}</td>
                                        <td>{user.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className="clear-database" onClick={handleClearDatabase}>
                        Очистити
                    </button>
                    <button className="menu-item-back" onClick={handleBackClick}>
                        ❮
                    </button>
                </div >
            )}


            {
                showHelp && (
                    <div className="help">
                        <div className='help-text'>

                            {/* <h1>Довідка</h1> */}

                            <h1>Опис гри</h1>

                            <p>Гра "Break Out" є спеціально розробленою програмою для лікування амбліопії, також відомої як "лінива очка". Ця гра спирається на принципи лікувальної гри, щоб сприяти відновленню нормального зору та поліпшенню зорових функцій у дітей та дорослих з амбліопією. Ця документація надає інструкції з використання гри та рекомендації для отримання максимальних результатів.</p>

                            <h3>Мета гри</h3>
                            <p>Метою гри "Break Out" є поліпшення зорових функцій шляхом активізації очей та сприяння бінарному зору. Гравцеві потрібно керувати платформою, яка відбиває м'яч, щоб розбити блоки, розташовані у верхній частині екрану. Гра спеціально розроблена таким чином, щоб стимулювати використання обох очей та поліпшити їх координацію.</p>

                            <h3>Управління грою</h3>
                            <p>Гравець може керувати платформою, використовуючи клавіші-стрілки вліво та вправо. Рух платформи дозволяє гравцеві відбивати м'яч та керувати його напрямком, щоб розбити блоки.</p>

                            <h3>Рівні складності</h3>
                            <p>Гра "Break Out" має різні рівні складності, які адаптуються під вік дитини та можуть бути вибрані гравцем. Починаючи зі спрощеного рівня, гравець може поступово підвищувати складність гри, дозволяючи більш активне використання обох очей та поліпшення зорової координації.</p>

                            <h2>Рекомендації для використання гри</h2>

                            <h3>Регулярність</h3>
                            <p>Регулярність гри є ключовим фактором для досягнення кращих результатів у лікуванні амбліопії. Рекомендується грати в "Break Out" щодня протягом визначеного періоду часу, зазвичай 20-30 хвилин. Це допоможе тренувати очі та зорову систему, поступово поліпшуючи їх функції.</p>
                            <h3>Оптимальна освітленість</h3>
                            <p>Гра повинна бути використана в добре освітленому приміщенні, де немає бликів або відблисків на екрані. Оптимальна освітленість допоможе гравцю краще сприймати графіку та покращити фокусування.</p>
                            <h3>Коректура помилок</h3>
                            <p>У разі помилки або неправильної фокусування, гравець повинен зосередитися на м'ячі та намагатися керувати платформою так, щоб відбити м'яч у бажаному напрямку. Це допоможе змусити очі працювати разом та покращити координацію.</p>
                            <h3>Прогресія</h3>
                            <p>Починаючи зі спрощеного рівня, гравець може поступово підвищувати складність гри з часом. Це дозволить систематично викликати очі та сприяти поліпшенню зору та зорової координації.</p>


                            <h2>Попередження та застереження</h2>


                            <h3>Консультація з лікарем</h3>
                            <p>Перш ніж почати використовувати гру "Break Out" для лікування амбліопії, рекомендується проконсультуватися з офтальмологом або спеціалістом з зорової терапії. Вони змож

                                уть надати індивідуальні рекомендації та визначити оптимальний час та тривалість гри відповідно до стану пацієнта.</p>

                            <h3>Перерва та відпочинок</h3>
                            <p>Під час гри в "Break Out" рекомендується робити перерви кожні 10-15 хвилин для відпочинку очей. Під час перерви можна зосередитися на далеких об'єктах або виконувати вправи для розслаблення очей.</p>

                            <h3>Дотримання інструкцій</h3>
                            <p>Гравець повинен дотримуватися інструкцій, наданих лікарем або спеціалістом з зорової терапії. Важливо регулярно виконувати гру та не пропускати заплановані сесії, щоб досягти оптимальних результатів.</p>

                            <h3>Некомфорт або біль</h3>
                            <p>Якщо гравець відчуває будь-який дискомфорт, біль або загрозу пошкодження зору під час гри, варто негайно зупинити гру та проконсультуватися з лікарем або спеціалістом.</p>



                        </div>
                        <button className="menu-item-back" onClick={handleBackClick}>
                            ❮
                        </button>
                    </div>

                )
            }
            <style>
                {`
      
      .full-screen-help .menu,
      .full-screen-help .logo {
        display: none;
      }

      .ball {
        fill: var(--ball-color);
      }

      .paddle {
        fill: var(--paddle-color);
      }
      .settings {
        font-size: var(--font-size);
      }

      .rating {
        font-size: var(--font-size);
      }
      .setting label {
        font-size: var(--font-size);
      }

    `}
            </style>
        </div >
    );
};

export default Menu;
