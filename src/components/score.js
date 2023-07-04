import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LEVELS } from '../game/levels';

export let setIsScoreUpdatingPaused;

const Score = ({ userID, score, isPaused }) => {
    const [lastUserID, setLastUserID] = useState(null);
    const [updatedScore, setUpdatedScore] = useState(score);
    const [isScoreUpdatingPaused, setIsScoreUpdatingPausedInternal] = useState(isPaused);
    setIsScoreUpdatingPaused = setIsScoreUpdatingPausedInternal;
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isScoreUpdatingPaused) {
                setUpdatedScore(prevScore => Math.floor(prevScore + LEVELS[0].speed + 2));
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [isScoreUpdatingPaused]);


    useEffect(() => {
        if (userID === lastUserID && updatedScore !== score) {
            const updateScoreOnServer = async () => {
                try {
                    await axios.put(`http://localhost:3001/user`, { score: updatedScore }); // Используем userID в URL
                    console.log('Рахунок гравця успішно оновлено');
                } catch (error) {
                    console.error('Помилка при оновленні рахунку гравця:', error.response.data);
                }
            };

            updateScoreOnServer();
        }
    }, [userID, lastUserID, updatedScore, score]);


    useEffect(() => {
        setUpdatedScore(score);
        setLastUserID(userID);
    }, [score, userID]);

    useEffect(() => {
        setIsScoreUpdatingPaused(isPaused);
    }, [isPaused]);



    return (
        <text x="520" y="30" fill="white" fontSize="25" fontWeight={500}>
            {updatedScore}
        </text>
    );
};

export default Score;
