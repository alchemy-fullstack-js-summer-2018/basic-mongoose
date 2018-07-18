/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbUri) {
    mongoose.connect(dbUri, { useNewUrlParser: true });

    mongoose.connect('connected', () => {
        console.log('Mongoose connection open at: ' + dbUri);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection has ended');
    });

    //This will end connection to mongoose if the app closes
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};