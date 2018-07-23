const router = require('express').Router();
const Game = require('../models/game');


module.exports = router
    .get('/', (req, res) => {
        Game.find(req.query)
            .lean()
            .select('Name')
            .then(games => res.json(games));
    })

    .get('/:id', (req, res) => {
        Game.findById(req.params.id)
            .lean()
            .then(game => {
                if(game === null) {
                    return res.sendStatus(404);
                }
                return res.json(game);
            });
    })

    .put('/:id', (req, res) => {
        Game.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            })
            .then(game => res.json(game));
    })

    .post('/', (req, res) => {
        Game.create(req.body)
            .then(game => res.json(game));
    })

    .delete('/:id', (req, res) => {
        Game.findByIdAndRemove(req.params.id)
            .then((game) => {
                if(game) {
                    return res.json({ removed: true });
                } else {
                    return res.json({ removed: false });
                }
            });
    });

   