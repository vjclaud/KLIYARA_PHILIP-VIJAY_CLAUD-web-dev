module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
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
        for(var i in users){
            if(users[i].username === username && users[i].password === password){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
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
        for(var i in users){
            if(users[i]._id === userId + ""){
                res.send(users[i]);
                return;
            }
        }
        res.send({});
    }

    function createUser(req, res) {
        var user = req.body;
        users.push(user);
        res.send(users);
    }
};