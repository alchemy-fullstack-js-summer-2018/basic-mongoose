const router = require('express').Router();
const Farm = require('../models/farm');

module.exports = router
    .get('/', (req, res) => {
        Farm.find(req.query)
            .lean()
            .then(farms => res.json(farms));
    })

    .post('/', (req, res) => {
        Farm.create(req.body)
            .then(farm => res.json(farm));
    });