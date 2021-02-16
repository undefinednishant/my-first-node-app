const mongoose = require('mongoose');
const playerModel = require('../model/PlayerSchema');
const utilsMessage = require('../utils/message.utils');
module.exports = {
    getHello: (req, res) => {
        res.json('hello')
    },

    getAllPlayer: async (req, res) => {
        const players = await playerModel.find();
        utilsMessage.successResponse(res, players, 'All record has been loaded.');
    },

    createPlayer: (req, res) => {
        const playerData = new playerModel({
            name: req.body.name,
            age: req.body.age
        });

        playerData.save(() => {
            //console.log('data created');
            utilsMessage.successResponse(res, playerData, 'Data has been created.');
        });
    },

    getOnePlayer: async (req, res) => {
        const id = req.params.id;
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const playerResult = await playerModel.findOne({
                "_id": id
            });

            if (!playerResult) {
                utilsMessage.errorMessages(res, 404, 'This player is not exist.');
            } else {
                utilsMessage.successResponse(res, playerResult, 'Data has been loaded.');
            }

        } else {
            utilsMessage.errorMessages(res, 400, 'This is not a valid id')
        }

    },

    updatePlayer: async (req, res) => {
        const id = req.params.id;
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const playerResult = await playerModel.findOne({
                "_id": id
            });

            if (!playerResult) {
                utilsMessage.errorMessages(res, 404, 'This player is not exist.');
            } else {

                // update data
                const playerData = {
                    name: req.body.name,
                    age: req.body.age
                };

                // write update suff
                const query = {
                    _id: id
                };
                const updatedPlayer = await playerModel.updateOne(query, playerData);

                // show response
                utilsMessage.successResponse(res, null, 'Data has been updaed!');

            }

        } else {
            utilsMessage.errorMessages(res, 400, 'This is not a valid id');
        }
    },
    deletePlayer: async (req, res) => {
        const id = req.params.id;
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const playerResult = await playerModel.findOne({
                "_id": id
            });

            if (!playerResult) {
                utilsMessage.errorMessages(res, 400, 'This player is not exist');
            } else {

                // write update suff
                const query = {
                    _id: id
                };

                await playerModel.deleteOne(query);
                utilsMessage.successResponse(res, {id: id}, 'Data has been deleted!');

            }

        } else {
            utilsMessage.errorMessages(res, 400, 'This is not a valid id');
        }
    }
};