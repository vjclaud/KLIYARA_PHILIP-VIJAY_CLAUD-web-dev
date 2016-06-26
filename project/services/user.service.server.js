var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

UserListType = {
    LIKE : 0,
    DISLIKE : 1,
    WATCH : 2
}

module.exports = function(app, models) {

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    var userModel = models.userModel;

    app.get("/auth/facebook", passport.authenticate('facebookMovie')) ;
    app.get("/auth/facebook/callback", passport.authenticate('facebookMovie', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    })) ;
    app.post("/api/m/user", createUser);
    app.post("/api/m/logout", logout);
    app.post("/api/m/register", register);
    app.post("/api/m/login", passport.authenticate('movie'), login);
    app.put("/api/m/user/:userId", updateUser);
    app.put("/api/m/user/:userId/addMovieToLikeList", addMovieToLikeList);
    app.put("/api/m/user/:userId/removeMovieFromLikeList", removeMovieFromLikeList);
    app.put("/api/m/user/:userId/addMovieToWatchList", addMovieToWatchList);
    app.put("/api/m/user/:userId/removeMovieFromWatchList", removeMovieFromWatchList);
    app.put("/api/m/user/:userId/addMovieToDislikeList", addMovieToDislikeList);
    app.put("/api/m/user/:userId/removeMovieFromDislikeList", removeMovieFromDislikeList);
    app.delete("/api/m/user/:userId", deleteUser);
    app.get("/api/m/user", getUsers);
    app.get("/api/m/loggedIn", loggedIn);
    app.get("/api/m/user/:userId", findUserById);


    passport.use('movie', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // $ rhc env set FACEBOOK_CLIENT_ID="" FACEBOOK_CLIENT_SECRET="" FACEBOOK_CALLBACK_URL="" -a App_Name

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID ?  process.env.FACEBOOK_CLIENT_ID : "551697491678954",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET ? process.env.FACEBOOK_CLIENT_SECRET : "clientSecret",
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL ? process.env.FACEBOOK_CALLBACK_URL : "http://localhost:3000/auth/facebook/callback"
    };

    passport.use('facebookMovie',new FacebookStrategy(facebookConfig, facebookLogin));

    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser){
                        return done(null, facebookUser);
                    }else{
                        facebookUser = {
                            username : profile.displayName.replace(/ /g,''),
                            facebook : {
                                token : token,
                                id : profile.id,
                                displayName : profile.displayName
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    return done(null, user);
                                }
                            )
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user == null){
                        return done(null, false);
                    }
                    if(user.password.charAt(0) != '$'){
                        return done(null, false);
                    }
                    var samePassword = bcrypt.compareSync(password, user.password);
                    if(user){
                        if(user.username === username && (samePassword === user.password || samePassword)) {
                            console.log(user);
                            return done(null, user);
                        } else {
                            console.log(user);
                            return done(null, false);
                        }
                    }else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err, null); }
                }
            );
    }


    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.send(req.user);
        }else{
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body['username'];
        var password = req.body['password'];
        req.body.password = bcrypt.hashSync(password);
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send('User already exists');
                        return;
                    }else{
                        return userModel.createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    req.login(user, function (err) {
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(user);
                        }
                    })
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        password = bcrypt.hashSync(user.password);
        if(username && password){
            findUserByCredentials(username, password, res);
        }else if(username){
            findUserByUsername(username, res);
        }else{
            res.send(users);
        }
    }

    function login(req, res){
        var user = req.user;

        req.login(user, function (err) {
            if(err){
                res.status(400).send(err);
            }else{
                res.json(user);
            }
        })

    }

    function findUserByCredentials(username, password, res){
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(username, res) {
        for(var i in users){
            if(users[i].username === username){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createUser(req, res) {


        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function userByAddingMovieToList(user, movie, listType) {
        switch(listType) {
            case UserListType.LIKE:
                if(user.likeList){
                    if(user.likeList['' + movie.id]==null){
                        user.likeList['' + movie.id] = movie;
                    }
                }else{
                    var likeList = {};
                    likeList['' + movie.id] = movie;
                    user.likeList = likeList;
                }
                break;
            case UserListType.DISLIKE:
                if(user.dislikeList){
                    if(user.dislikeList['' + movie.id]==null){
                        user.dislikeList['' + movie.id] = movie;
                    }
                }else{
                    var dislikeList = {};
                    dislikeList['' + movie.id] = movie;
                    user.dislikeList = dislikeList;
                }
                break;
            case UserListType.WATCH:
                if(user.watchList){
                    if(user.watchList['' + movie.id]==null){
                        user.watchList['' + movie.id] = movie;
                    }
                }else{
                    var watchList = {};
                    watchList['' + movie.id] = movie;
                    user.dislikeList = watchList;
                }
                break;
            default:
        }

        return user;
    }

    function userByRemovingMovieToList(user, movie, listType) {
        switch(listType) {
            case UserListType.LIKE:
                if(user.likeList){
                    if(user.likeList['' + movie.id]!=null){
                        delete user.likeList['' + movie.id];
                    }
                }
                break;
            case UserListType.DISLIKE:
                if(user.dislikeList){
                    if(user.dislikeList['' + movie.id]!=null){
                        delete user.dislikeList['' + movie.id];
                    }
                }
                break;
            case UserListType.WATCH:
                if(user.watchList){
                    if(user.watchList['' + movie.id]!=null){
                        delete user.watchList['' + movie.id];
                    }
                }
                break;
            default:
        }

        return user;
    }

    function addMovieToList(userId, movie, listType) {
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var updatedUser = userByAddingMovieToList(user, movie, listType);
                    updateUserWithUpdatedUser(userId, updatedUser);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function removeMovieFromList(userId, movie, listType) {
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var updatedUser = userByRemovingMovieToList(user, movie, listType);
                    updateUserWithUpdatedUser(userId, updatedUser);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function addMovieToLikeList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        addMovieToList(userId, movie, UserListType.LIKE);
    }

    function removeMovieFromLikeList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        removeMovieFromList(userId, movie, UserListType.LIKE);
    }

    function addMovieToWatchList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        addMovieToList(userId, movie, UserListType.WATCH);
    }

    function removeMovieFromWatchList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        removeMovieFromList(userId, movie, UserListType.WATCH);
    }

    function addMovieToDislikeList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        addMovieToList(userId, movie, UserListType.DISLIKE);
    }

    function removeMovieFromDislikeList(req, res) {
        var movie = req.body;
        var userId = req.params['userId'];
        removeMovieFromList(userId, movie, UserListType.DISLIKE);
    }

    function updateUserWithUpdatedUser(userId, updatedUser) {
        userModel
            .updateUser(userId, updatedUser)
            .then(
                function (stats) {
                    console.log(stats);
                    res.json(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var updatedUser = req.body;
        var userId = req.params['userId'];
        userModel
            .updateUser(userId, updatedUser)
            .then(
                function (stats) {
                    console.log(stats);
                    res.json(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.json(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};