// const mongoose = require('mongoose');
// const connect = require('./lib/connect');
// const Team = require('./lib/models/team');

// connect('mongodb://localhost:27017/teams_test');

// Team.findById('5b4e6bb404cc451d533c4f5e')
//     .lean()
//     .then(team => {
//         console.log(team);

//         return Team.find()
//             .lean()
//             .select('name');
//     })
//     .then(teams => {
//         console.log(teams);
//     })
//     .catch(console.log)
//     .then(() => mongoose.connection.close());
