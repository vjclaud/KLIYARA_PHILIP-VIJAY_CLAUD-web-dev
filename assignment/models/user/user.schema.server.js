module.exports = function () {
    var mongoose = require('mongoose');
    var UserScheme = mongoose.Schema({
        username : {type : String, required : true},
        password : String,
        firstName : String,
        lastName : String,
        email : String,
        phone : String,
        //websites : [Website],
        dateCreated : {type : Date, default : Date.now}
    }, {collection : "assignment.user"});

    return UserScheme;
};