const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    platform: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'normal', 'hard']
    },
    originCountry: {
        city: String,
        country: {
            type: String,
            required: true
        }
    },
    freeVersion: Boolean,
    releaseYear: Number,
    rating: {
        type: Number,
        min: 1,
        max: 10,
    }   
});

module.exports = mongoose.model('Rhythm-games', schema);