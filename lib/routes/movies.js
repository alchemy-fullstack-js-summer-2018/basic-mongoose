const router = require('express').Router();
const Movie = require('../models/movie');

module.exports = router
    .get('/:id', (req, res) => {
        Movie.findById(req.params.id)
            .select()
            .lean()
            .then(movie => res.json(movie));
    })
    .post('/', (req, res) => {
        Movie.create(req.body)
            .then(movie => res.json(movie));
    });