const router = require('express').Router();
const Show = require('../models/show');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .get('/', (req, res) => {
        Show.find(req.query)
            .select('name firstAired')
            .lean()
            .then(shows => res.json(shows));
    })
    
    .get('/:id', (req, res) => {
        Show.findById(req.params.id)
            .select('firstAired')
            .lean()
            .then(show => res.json(show));
    })

    .put('/:id', (req, res) => {
        Show.findByIdAndUpdate(req.params.id, req.body, updateOptions)
            .then(show => res.json(show));
    })

    .post('/', (req, res) => {
        Show.create(req.body)
            .then(show => res.json(show));
    });