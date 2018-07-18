const mongoose = require('mongoose');
const connect = require('./lib/connect');
const Team = require('./lib/models/team');

connect('mongodb://localhost:27017/teams_test');

const body = {
    name: 'Trailblazers',
    address: { state: 'OR' },
    roster: 13
};

Team.create(body)
    .catch(console.log)
    .then(() => mongoose.connection.close());
