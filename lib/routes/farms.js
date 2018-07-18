const router = require('express').Router();
const Farm = require('../models/farm');

module.exports = router
    .get('/', (req, res) => {
        Farm.find(req.query)
            .lean()
            .then(farms => res.json(farms));
    })

    .get('/:id', (req, res) => {
        Farm.findById(req.params.id)
            .lean()
            .then(farm => res.json(farm));
    })

    .put('/:id', (req, res) => {
        Farm.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true,
                runValidators: true
            }
        )
            .then(farm => res.json(farm));
    })

    .post('/', (req, res) => {
        Farm.create(req.body)
            .then(farm => res.json(farm));
    });