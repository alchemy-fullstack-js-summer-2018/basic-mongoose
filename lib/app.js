const express = require('express');
const app = express();

// Setup "Middleware":
const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
// will try and serve GET path as a file from public
app.use(express.static(publicDir));
// read the request body and put onto req.body
app.use(express.json());

// add routes:

const farm = require('./routes/farms');
app.use('/api/farms', farm);

module.exports = app;