const express = require('express');
const mongoose = require('mongoose');

const app = express();

const Schema = mongoose.Schema

// connect mongo
mongoose.connect('mongodb://localhost:27017/my-test', { useNewUrlParser: true ,  useUnifiedTopology: true});

// schema - model
const playerSchema = new Schema({
    name: String,
    age: Number
});

const playerModel = mongoose.model('player', playerSchema);


const playerData = new playerModel({
    name: 'rahman',
    age: 20
});

playerData.save(() => {
    console.log('data added');
})




// mongoose DB connection
mongoose.connection.on('connected', () => {
    console.log(`MongoDB is connected`);
});
mongoose.connection.on('error', (err) => {
    console.log(`DB Error: ${err}`);
})

// listen
app.listen(4000, () => console.log(`Server is running at localhost:4000`));