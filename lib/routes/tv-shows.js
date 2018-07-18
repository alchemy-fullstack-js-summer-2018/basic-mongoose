const router = require('express').Router();
const Show = require('../models/show');

module.exports = router
    .post('/', (req, res) => {
        Show.create(req.body)
            .then(show => res.json(show));
    })

    .get('/:id', (req, res) => {
        Show.findById(req.params.id)
            .lean()
            .then(show => res.json(show));
    })

    .get('/', (req, res) => {
        Show.find()
            .lean()
            .then(shows => res.json(shows));
    })

    .put('/:id', (req, res) => {
        Show.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(update => res.json(update));
    })

    .delete('/:id', (req, res) => {
        Show.findByIdAndRemove(req.params.id)
            .then(result => {
                if(result) {
                    res.json({ removed: true });
                }
                else res.json({ removed: false });
            });
    });