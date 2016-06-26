module.exports = function () {
    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        movieId : {type : String, required : true},
        userId : String,
        review : String
    }, {collection : "project.review"});

    return MovieSchema;
};