const connect = require('../../lib/connect');
connect('mongodb://localhost:27017/rhythm_games');
const mongoose = require('mongoose');

after(() => {
    return mongoose.connection.close();
});

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotfound') throw err;
            });
    }
};