module.exports = {
    isObject: () => {

    },

    isObjectAndHasItem: (obj) => {
        const size = Object.keys(obj).length;
        return size > 0;
       
    }
}