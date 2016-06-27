module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username : {type : String, required : true},
        password : String,
        likeList : Object,
        watchList : Object,
        dislikeList : Object,
        following : Object,
        followerCount : Number,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        facebook : {
            token : String,
            id : String,
            displayName : String
        },
        google:   {
            id:    String,
            token: String
        },
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "project.user"});

    return UserSchema;
};