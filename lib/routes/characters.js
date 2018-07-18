const router = require('express').Router();
const Character = require('../models/character');

module.exports = router
    .get('/', (req, res) => {
        Character.find(req.query)
            .lean()
            .then(characters => res.json(characters));
    })

    .get('/:id', (req, res) => {
        Character.findById(req.params.id)
            .lean()
            .then(character => res.json(character));
    })

    .post('/', (req, res) => {
        Character.create(req.body)
            .then(character => res.json(character));
    })

    .delete('/:id', (req, res) => {
        Character.findByIdAndRemove(req.params.id)
            .then(() => res.json({ removed: true }));
    });