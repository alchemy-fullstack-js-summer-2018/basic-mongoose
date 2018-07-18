const router = require('express').Router();
const Show = require('../models/show');

module.exports = router
    .get('/', (req, res) => {
        Show.find(req.query)
            .select('name firstAired')
            .lean()
            .then(shows => res.json(shows));
    })

    .post('/', (req, res) => {
        Show.create(req.body)
            .then(show => res.json(show));
    });