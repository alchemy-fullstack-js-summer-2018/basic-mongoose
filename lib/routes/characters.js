const router = require('express').Router();
const Character = require('../models/character');

module.exports = router
    .get('/', (req, res) => {
        Character.find(req.query)
            .lean()
            .then(characters => res.json(characters));
    })

    .post('/', (req, res) => {
        Character.create(req.body)
            .then(character => res.json(character));
    });