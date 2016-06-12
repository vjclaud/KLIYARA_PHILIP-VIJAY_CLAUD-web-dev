module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = mongoose.Schema({
        _user : {type : mongoose.Schema.ObjectId, ref : "User"},// The ref : "refName" should match the name of the model
        name : String,
        description : String,
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "assignment.website"});

    return WebsiteSchema;
};