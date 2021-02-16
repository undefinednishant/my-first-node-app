const playerController = require('../controller/PlayerController');
module.exports = (app) => {

    app.get('/hello', playerController.getHello);

    // create player
    app.post('/player', playerController.createPlayer);


    // get all players
    app.get('/players', playerController.getAllPlayer);

    // get single player
    app.get('/player/:id', playerController.getOnePlayer)


    // update player
    app.put('/player/:id', playerController.updatePlayer);

    app.delete('/player/:id', playerController.deletePlayer)
}