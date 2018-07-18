const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());

const movie = require('./routes/movies');
app.use('/api/movies', movie);

const notFound = require('./routes/notFound');
app.use('/bad', notFound);

module.exports = app;