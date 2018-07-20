const express = require('express');
const app = express();

app.use(express.json());

const team = require('./routes/teams');
app.use('/api/teams', team);

module.exports = app; 