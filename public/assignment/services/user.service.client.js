(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser : createUser,
            createUserWithUsernameAndPassword : createUserWithUsernameAndPassword,
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser
        }

        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);
        }

        function createUserWithUsernameAndPassword(username, password) {
            var user = {
                username: username + "",
                password: password + ""
            }
            return createUser(user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {

            var url = "/api/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

    }
})();