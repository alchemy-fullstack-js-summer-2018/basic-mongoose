const router = require('express').Router;
const Rudething = require('../models/rudething');

module.exports = router
    .post('/', (req, res) => {
        Rudething.create(req.body)
            .then(rudething => res.json(rudething));
    });
