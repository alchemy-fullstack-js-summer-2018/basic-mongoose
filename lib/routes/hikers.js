const router = require('express').Router();
const Hiker = require('../models/hiker');

module.exports = router
    .post('/', (req, res) => {
        Hiker.create(req.body)
            .then(hiker => res.json(hiker));
    });