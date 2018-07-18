const express = require('express');
const app = express();

app.use(express.json());

const show = require('./routes/tvshows');
app.use('/api/tvshows', show);
module.exports = app;