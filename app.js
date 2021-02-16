const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// config //
const databaseConfig = require('./src/config/database.config');
databaseConfig();

// middleware to parse application/json from body request
app.use(bodyParser({
    extended: true
}));
app.use(bodyParser.json());


// custom router
const playerRouter = require('./src/route/PlayerRouter')
playerRouter(app);


// listen
app.listen(4000, () => console.log(`Server is running at localhost:4000`));