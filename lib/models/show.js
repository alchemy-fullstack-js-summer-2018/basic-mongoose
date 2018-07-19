const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    crew: {
        creators: String,
        directors: [String],
        cinematographer: String
    },
    firstAired: {
        type: String,
        required: true
    },
    networkType: {
        type: String,
        required: true,
        enum: ['cable', 'broadcast']
    },
    seasons: {
        type: Number,
        min: 1
    },
    ended: Boolean,
    actors: [String]
});

module.exports = mongoose.model('Show', schema);