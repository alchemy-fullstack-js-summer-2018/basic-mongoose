const router = require('express').Router();
const Artist = require('../models/artist');

module.exports = router
    .get('/', (req, res) => {
        Artist.find(req.query)
            .lean()
            .then(artists => res.json(artists));
    })
    .get('/:id', (req, res) => {
        Artist.findById(req.params.id)
            .lean()
            .then(artist => res.json(artist));
    })
    .post('/', (req, res) => {
        Artist.create(req.body)
            .then(artist => res.json(artist));
    });