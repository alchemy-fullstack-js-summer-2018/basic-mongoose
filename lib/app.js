const express = require('express');
const app = express();

app.use(express.json());

const artist = require('./routes/artists');
app.use('/api/artists', artist);

module.exports = app;