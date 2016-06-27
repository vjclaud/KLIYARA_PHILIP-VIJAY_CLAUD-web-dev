module.exports = function () {
    var mongoose = require('mongoose');
    var ReviewScheme = mongoose.Schema({
        movieId : {type : String, required : true},
        userId : String,
        username : String,
        review : String
    }, {collection : "project.review"});

    return ReviewScheme;
};