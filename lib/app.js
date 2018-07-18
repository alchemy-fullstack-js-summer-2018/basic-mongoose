const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());

//don't forget to change thing:
// const movie = require('./routes/movies');
// app.use('/api/movies', movie);

module.exports = app;