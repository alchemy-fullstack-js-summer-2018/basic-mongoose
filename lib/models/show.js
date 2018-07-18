const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    characters: [String],
    numberOfSeasons: {
        type: Number,
        min: [1, 'Does this TV Show even exist?']
    },
    moreInfo: {
        yearReleased: Number,
        creator: [String],
        availableOn: String,
        rating: {
            type: Number,
            min: [1, 'Oh gosh, it must be terribly bad'],
            max: [5, 'You\'re very kind but I can only accept 5 at max']
        }
    }
});

module.exports = mongoose.model('Show', schema);