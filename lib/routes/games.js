const router = require('express').Router();
const Game = require('../models/game');


module.exports = router
    .get('/', (req, res) => {
        Game.find(req.query)
            .lean()
            .then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        Game.findById(req.params.id)
            .then(games => res.json(games));
    })

    .post('/', (req, res) => {
        Game.create(req.body)
            .then(game => res.json(game));
    });

   