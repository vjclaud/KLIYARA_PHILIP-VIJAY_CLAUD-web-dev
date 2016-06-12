module.exports = function(){

    var mongoose = require('mongoose');
    var connection = mongoose.connect('mongodb://localhost/wamDatabase');
    var autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(connection);

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    }
    return models;
};