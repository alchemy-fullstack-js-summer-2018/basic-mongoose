const express = require('express');
const app = express();

//middleware
const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(piblicDir));

app.use(express.json());

const rhythmGame = require('./routes/rhythm-games');
app.use('/rhythm-games', rhythmGame);

module.exports = app;