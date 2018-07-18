const router = require('express').Router();
const RhythmGame = require('../models/rhythm-game');

module.exports = router
    .get('/', (req, res) => {
        RhythmGame.find(req.query)
            .lean()
            .then(game => res.json(game));
    })
    .get('/:id', (req, res) => {
        RhythmGame.findById(req.params.id)
            .lean()
            .then(game => res.json(game));
    })
    .post('/', (req, res) => {
        RhythmGame.create(req.body)
            .then(game => res.json(game));
    })
    .put('/:id', (req, res) => {
        RhythmGame.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then(game => res.json(game));
    })
    .delete('/:id', (req, res) => {
        RhythmGame.findByIdAndRemove(req.params.id)
            .then(result => {
                if(result) res.json({ removed: true });
                else { 
                    res.json({ removed: false });
                }
            });

    });
