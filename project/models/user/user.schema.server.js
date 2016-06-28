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
        admin : Boolean,
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

// db.project.user.find({'_id':'5771c93795b629bebbe894af'})
// db.project.user.update({'username':'admin'}, {$set : {'admin' : true}})