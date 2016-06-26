module.exports = function () {
    var mongoose = require('mongoose');
    var MovieSchema = mongoose.Schema({
        username : {type : String, required : true},
        password : String,
        likeList : Object,
        watchList : Object,
        dislikeList : Object,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        facebook : {
            token : String,
            id : String,
            displayName : String
        },
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "project.user"});

    return UserSchema;
};