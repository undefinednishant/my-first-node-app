const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// player schema - model
const playerSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('player', playerSchema);