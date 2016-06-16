module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        _website : {type : mongoose.Schema.ObjectId, ref : "Website"},// The ref : "refName" should match the name of the model
        name : String,
        title : String,
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "assignment.page"});

    return PageSchema;
};