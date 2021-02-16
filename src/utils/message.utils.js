module.exports = {
    errorMessages: (res, errorCode, message) => {
        res.status(errorCode).json({
            message: message
        });
    },

    successResponse: (res, data, message) => {
        const customData = {
            data: data,
            message: message
        }
        res.status(200).json(customData);
    }
}