const router = require('express').Router();
const Team = require('../models/team');

module.exports = router
    .get('/', (req, res) => {
        Team.find(req.query)
            .lean()
            .then(teams => res.json(teams));
    })

    .post('/', (req, res) => {
        Team.create(req.body)
            .then(team => res.json(team));
    });