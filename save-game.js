const mongoose = require('mongoose');
const Game = require('./lib/models/game');

mongoose.connect('mongodb://localhost:27017/game-demo', { useNewUrlParser: true });

const game = new Game({
    Name: ' Warframe',
    Origin: {
        Country: 'Canada'
    },
    Console: ['PS4', 'PC'],
    Revenue: 1,
    Philosophical: false 
});

game.save()
    .then(saved => {
        console.log(saved);
    })
    .catch(console.log())
    .then(() => mongoose.connection.close());