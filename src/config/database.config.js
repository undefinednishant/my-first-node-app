const mongoose = require('mongoose');
module.exports = () => {
    // connect mongo
    mongoose.connect('mongodb://localhost:27017/my-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });


    // mongoose DB connection
    mongoose.connection.on('connected', () => {
        console.log(`MongoDB is connected`);
    });
    mongoose.connection.on('error', (err) => {
        console.log(`DB Error: ${err}`);
    })
}