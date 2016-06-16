module.exports = function(app, models) {

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password){
            findUserByCredentials(username, password, res);
        }else if(username){
            findUserByUsername(username, res);
        }else{
            res.send(users);
        }
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