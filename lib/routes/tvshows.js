const router = require('express').Router();
const Show = require('../models/show');

module.exports = router
    .post('/', (req, res) => {
        Show.create(req.body)
            .then(show => res.json(show));
    });