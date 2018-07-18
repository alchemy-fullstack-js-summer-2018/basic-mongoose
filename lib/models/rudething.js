const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    human: Boolean,
    age: Number,
    zodiac: String,
    personality: {
        traits: [String],
        rudeness: Number,
        empathy: Number
    },
    profession: String
});


module.exports = mongoose.model('Rudethings', schema);