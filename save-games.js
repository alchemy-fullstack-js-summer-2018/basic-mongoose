const mongoose = require('mongoose');
const connect = require('./lib/connect');
const Game = require('./lib/models/game');

connect('mongodb://localhost:27017/games_demo', { useNewUrlParser: true });

const body = {
    Name: ' Warframe',
    Origin: {
        Country: 'Canada'
    },
    Console: ['PS4', 'PC'],
    Revenue: 1,
    Philosophical: false 
};

Game.create(body)
    .catch(console.log)
    .then(() => mongoose.connection.close());