const mongoose = require('mongoose');
const playerModel = require('../model/PlayerSchema');
const utilsMessage = require('../utils/message.utils');
const utilsValidation = require('../utils/validation.utils');

module.exports = {
    getHello: (req, res) => {
        res.json('hello')
    },

    getAllPlayer: async (req, res) => {
        const players = await playerModel.find();

        //query with mongoose
        const query = playerModel.find({}).select('-salary -__v');

        query.exec( (err, data) => {
            if (err) return next(err);

            utilsMessage.successResponse(res, data, 'All record has been loaded.');
        });

       
    },

    createPlayer: (req, res) => {
        const playerData = new playerModel({
            name: req.body.name,
            age: req.body.age,
            location: req.body.location,
            salary: req.body.salary,
            active: req.body.active
        });

        if(utilsValidation.isObjectAndHasItem(req.body)) {
            playerData.save(() => {
                //console.log('data created');
                utilsMessage.successResponse(res, {
                name: req.body.name
                }, 'Data has been created.');
            });
        } else {
            utilsMessage.errorMessages(res, 400, 'Please provide required fields');
        }
        
    },

    getOnePlayer: async (req, res) => {
        const id = req.params.id;
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (isValidId) {
            const playerResult = await playerModel.findOne({
                "_id": id
            }).select('-__v');;

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
                if(utilsValidation.isObjectAndHasItem(req.body)) {
                    // write update suff
                    const query = {
                        _id: id
                    };
                    await playerModel.updateOne(query, req.body);

                    // show response
                    utilsMessage.successResponse(res, null, 'Data has been updaed!');

                } else {
                    utilsMessage.errorMessages(res, 400, 'There are no fields to update');
                }
               
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