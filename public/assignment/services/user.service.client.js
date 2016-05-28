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
            findUserByUsernameAndPassword : findUserByUsernameAndPassword,
            findUserById : findUserById,
            updateUserById : updateUserById,
            deleteUser : deleteUser
        }

        return api;
        
        
        function deleteUser(user) {
            for(var i in users){
                if(users[i]._id === id){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function createUser(user) {
            users.push(user);
        }
        
        function findUserByUsernameAndPassword(username, password) {
            for(var i in users){
                if(users[i].username === username && users[i].password === password){
                    return users[i];
                }
            }
            return null;
        }

        function findUserById(id) {
            for(var i in users){
                if(users[i]._id === id){
                    return users[i];
                }
            }
            return null;
        }

        function updateUserById(id, newUser) {
            var user = findUserById(id);

            if(user){
                user.email = newUser.email;
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                return true;
            }else{
                return false;
            }
        }
    }
})();