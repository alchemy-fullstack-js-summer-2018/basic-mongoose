const connect = require('../../lib/connect');
connect('mongodb://localhost:27017/games-demo');
const mongoose = require('mongoose');

after(() => {
    return mongoose.connect.close();
});

module.exports = {
    dropCollection(name) {
        return mongoose.connection.dropCollection(name)
            .catch(err => {
                if(err.codeName !== 'NamespaceNotFound') throw err;
            });
    }
};