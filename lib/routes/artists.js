const router = require('express').Router();
const Artist = require('../models/artist');

module.exports = router
    .get('/', (req, res) => {
        Artist.find(req.query)
            .lean()
            .then(artists => res.json(artists));
    })
    .get('/:id', (req, res) => {
        Artist.findById(req.params.id)
            .lean()
            .then(artist => res.json(artist));
    })
    .post('/', (req, res) => {
        Artist.create(req.body)
            .then(artist => res.json(artist));
    })
    .put('/:id', (req, res) => {
        Artist.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            })
            .then(artist => res.json(artist));
    })
    .delete('/:id', (req, res) => {
        Artist.findByIdAndRemove(req.params.id)
            .then(artist => {
                if(artist){
                    res.json({ removed: true });
                } else res.json({ removed: false });
            });
    });