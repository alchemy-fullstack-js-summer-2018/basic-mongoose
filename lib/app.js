const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

const show = require('./routes/shows');
app.use(express.json());

app.use('/api/shows', show);

module.exports = app;