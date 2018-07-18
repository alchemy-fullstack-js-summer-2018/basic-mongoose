const express = require('express');
const app = express();

//Setup middleware
const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

//will try and ser GET path as a file from public
app.use(express.static(publicDir));
//read the request body and put onto req.body
app.use(express.json());

//add routes

const character = require('./routes/characters');
app.use('/api/characters', character);

module.exports = app;