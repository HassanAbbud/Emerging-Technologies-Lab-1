const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    developer: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Game', gameSchema);