const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
    response
} = require('express');

const app = express();

const Schema = mongoose.Schema;

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

// player schema - model
const playerSchema = new Schema({
    name: String,
    age: Number
});

const playerModel = mongoose.model('player', playerSchema);

// create player
app.post('/player', (req, res) => {
    console.log(' h ', req.body)
    const playerData = new playerModel({
        name: req.body.name,
        age: req.body.age
    });

    playerData.save(() => {
        console.log('data added');
        res.json({
            message: 'Player has been added'
        })
    });

});


// get all players
app.get('/players', async (req, res) => {
    const players = await playerModel.find();
    res.json(players);
});

// get single player
app.get('/player/:id', async (req, res) => {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (isValidId) {
        const playerResult = await playerModel.findOne({
            "_id": id
        });

        if (!playerResult) {
            res.status(404).json({
                message: 'This player is not exist'
            });
        } else {
            res.json(playerResult);
        }

    } else {
        res.status(400).json({
            message: 'This is not a valid id'
        });
    }

})


// update player
app.put('/player/:id', async (req, res) => {
    const id = req.params.id;
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (isValidId) {
        const playerResult = await playerModel.findOne({
            "_id": id
        });

        if (!playerResult) {
            res.status(404).json({
                message: 'This player is not exist'
            });
        } else {

            // update data
            const playerData = {
                name: req.body.name,
                age: req.body.age
            };
            
            // write update suff
            const query = { _id: id };
            const updatedPlayer = await playerModel.updateOne(query, playerData);
            
            // show response
            res.status(200).json({
                id: id,
                message: 'Updated',
                info: {
                    matched: updatedPlayer.n,
                    modified: updatedPlayer.nModified
                }
            });

        }

    } else {
        res.status(400).json({
            message: 'This is not a valid id'
        });
    }
});











// mongoose DB connection
mongoose.connection.on('connected', () => {
    console.log(`MongoDB is connected`);
});
mongoose.connection.on('error', (err) => {
    console.log(`DB Error: ${err}`);
})

// listen
app.listen(4000, () => console.log(`Server is running at localhost:4000`));