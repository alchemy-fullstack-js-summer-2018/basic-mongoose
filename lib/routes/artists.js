const router = require('express').Router();
const Artist = require('../models/artist');

module.exports = router
    .post('/', (req, res) => {
        Artist.create(req.body)
            .then(artist => res.json(artist));
    });