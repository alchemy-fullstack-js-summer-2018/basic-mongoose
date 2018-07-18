const router = require('express').Router();
const Show = require('../models/show');

module.exports = router
    .get('/', (req, res) => {
        Show.find(req.query)
            .lean()
            .then(shows => res.json(shows));
    });