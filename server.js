// index.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'breakout_amb'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.connect((err) => {
    if (err) {
        console.error('Помилка при підключенні до бази даних: ', err);
        process.exit(1);
    } else {
        console.log("Підключення до бази даних успішне");
        app.listen(3001, () => {
            console.log('Сервер запущено на порту 3001');
        });
    }
});

app.options('/user', cors());

app.get('/user', (req, res) => {
    const sql = 'SELECT * FROM `user`';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Помилка при виконанні запиту: ', err);
            res.status(500).send('Помилка сервера');
        } else {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.json(results);
        }
    });
});

app.post('/user', (req, res) => {
    try {
        const { name, age, score } = req.body;

        const query = `INSERT INTO \`user\` (name, age, score) VALUES ('${name}', ${age}, ${score})`;

        connection.query(query, (err, results) => {
            if (err) {
                console.error('Помилка при виконанні запиту: ', err);
                res.status(500).send('Помилка сервера');
            } else {
                res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.json(results);
            }
        });
    } catch (error) {
        console.error('Помилка при обробці запиту: ', error);
        res.status(500).send('Помилка сервера');
    }
});

app.put('/user', (req, res) => {
    const updateScoreOnServer = async (updatedScore) => {
        const getLastPlayerId = () => {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT `userID` FROM `user` ORDER BY `userID` DESC LIMIT 1';

                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        const lastPlayerId = result[0].userID;
                        resolve(lastPlayerId);
                    }
                });
            });
        };

        try {
            const lastPlayerId = await getLastPlayerId();
            const sql = `UPDATE \`user\` SET score = ${updatedScore} WHERE userID = ${lastPlayerId}`;

            connection.query(sql, (err, result) => {
                if (err) {
                    console.error('Помилка при виконанні запиту: ', err);
                    res.status(500).send('Помилка сервера');
                } else {
                    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
                    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    res.status(200).send('Рахунок успішно оновлено');
                }
            });
        } catch (error) {
            console.error('Помилка при отриманні останнього ID гравця: ', error);
            res.status(500).send('Помилка сервера');
        }
    };

    const { score: updatedScore } = req.body; // Get the updatedScore from the request body
    updateScoreOnServer(updatedScore);
});

app.delete('/user', (req, res) => {
    const sql = 'DELETE FROM `user`';

    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Помилка при виконанні запиту: ', err);
            res.status(500).send('Помилка сервера');
        } else {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.status(200).send('База даних успішно очищена');
        }
    });
});
