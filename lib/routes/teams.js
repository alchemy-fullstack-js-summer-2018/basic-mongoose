const router = require('express').Router();
const Team = require('../models/team');

module.exports = router
    .post('/', (req, res) => {
        Team.create(req.body)
            .then(team => res.json(team));
    })
    .get('/', (req, res) => {
        Team.find(req.query)
            .lean()
            .then(teams => res.json(teams));
    })
    .get('/:id', (req, res) => {
        Team.findById(req.params.id)
            .lean()
            .then(team => res.json(team));
    });
    


    