const express = require('express');
const app = express();

app.use(express.json());

const rudething = require('./routes/rudethings');
app.use('/api/rudethings', rudething);

module.exports = app;