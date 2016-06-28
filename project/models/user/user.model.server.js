module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("MUser", UserSchema);
    var api = {
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findFacebookUser : findFacebookUser,
        findAllUsers : findAllUsers,
        findUsersWithIds : findUsersWithIds,
        findUserByGoogleId : findUserByGoogleId
    };
    return api;

    function findUsersWithIds(ids) {
        var mongooseIds = [];
        for(var i in ids){
            mongooseIds.push(mongoose.Types.ObjectId(ids[i]));
        }
        return User.find({'_id': { $in: mongooseIds}});
    }
    function findAllUsers() {
        return User.find({});
    }

    function findFacebookUser(id) {
        return User.findOne({"facebook.id" : id});
    }

    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username : username})
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username : username, password : password})
    }

    function updateUser(userId, user) {
        return User
            .update(
                {_id : userId},{
                    $set : {
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        likeList : user.likeList ? user.likeList : {},
                        dislikeList: user.dislikeList ? user.dislikeList : {},
                        watchList: user.watchList ? user.watchList : {},
                        following: user.following ? user.following : {},
                        followerCount: user.followerCount ? user.followerCount : 0,
                        admin : true
                    }
                }
            );
    }

    function deleteUser(userId) {
        return User.remove({_id : userId});
    }

};
