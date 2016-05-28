(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",	password: "alice",	firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",  	password: "bob",  	firstName: "Bob",	lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService() {
        var api = {
            createUser : createUser,
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser
        }

        return api;

        function createUser(user) {

        }

        function findUserById(userId) {
            for(var i in users){
                if(users[i]._id === userId){
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {
            for(var i in users){
                if(users[i].username === username && users[i].password === password){
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            var userToUpdate = findUserById(userId);

            if(userToUpdate){
                userToUpdate.email = user.email;
                userToUpdate.firstName = user.firstName;
                userToUpdate.lastName = user.lastName;
                return true;
            }else{
                return false;
            }
        }

        function deleteUser(userId) {
            for(var i in users){
                if(users[i]._id === userId){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }

    }
})();