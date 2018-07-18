const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    genre: String,
    style: {
        type: String,
        enum: ['solo', 'group']
    },
    famousAlbums: [{
        type: String
    }],
    numAlbums:{ 
        type: Number,
        min: 1,
        required: true
    },
    stillActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Artist', schema);