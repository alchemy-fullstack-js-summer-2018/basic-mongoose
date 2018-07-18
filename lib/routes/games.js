const router = require('express').Router();
const Game = require('../models/game');

module.export = router
    .get('/', (req, res) => {
        Game.find(req.query)
            .lean()
            .then(games => res.json(games));
    });