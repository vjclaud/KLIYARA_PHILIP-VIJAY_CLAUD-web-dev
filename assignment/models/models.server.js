module.exports = function(){

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wamDatabase');

    var models = {
        userModel: require("./user/user.model.server")()
    }
    return models;
};