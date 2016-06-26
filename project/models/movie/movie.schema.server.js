module.exports = function () {
    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        id : {type : String, required : true},
        title : String,
        overview : String,
        poster_path : String,
        original_language : String,
        release_date : String,
        reviews : Object
    }, {collection : "project.movie"});

    return MovieSchema;
};