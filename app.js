const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
    response
} = require('express');

const app = express();



// middleware to parse application/json from body request
app.use(bodyParser({
    extended: true
}));
app.use(bodyParser.json());

// connect mongo
mongoose.connect('mongodb://localhost:27017/my-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// custom router
const playerRouter = require('./src/route/PlayerRouter')
playerRouter(app);

// mongoose DB connection
mongoose.connection.on('connected', () => {
    console.log(`MongoDB is connected`);
});
mongoose.connection.on('error', (err) => {
    console.log(`DB Error: ${err}`);
})

// listen
app.listen(4000, () => console.log(`Server is running at localhost:4000`));