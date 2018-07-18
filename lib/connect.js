/* eslint no-console: "off" */
const mongoose = require('mongoose');

module.exports = function(dbUri) {
    //CONNECTION

    // Success
    mongoose.connect(dbUri, { useNewUrlParser: true });
    mongoose.connection.on('connected', () => {
        console.log('* Mongoose default connection open to *' + dbUri);
    });

    // Error
    mongoose.connection.on('error', (err) => {
        console.log('* Mongoose default connection error: *' + err);
    });

    // Connection disconnected
    mongoose.connection.on('disconnected', () => {
        console.log('* Mongoose default connection disconnected *');
    });
    // If Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('* Mongoose default connection disconnected through app termination *');
        });
    });
};