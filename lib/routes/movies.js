const router = require('express').Router();
const Movie = require('../models/movie');

module.exports = router
    .post('/', (req, res) => {
        Movie.create(req.body)
            .then(movie => res.json(movie));
    });