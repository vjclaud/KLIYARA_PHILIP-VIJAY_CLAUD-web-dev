(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService($http) {
        var api = {
            createUser : createUser,
            login : login,
            logout : logout,
            register : register,
            loggedIn : loggedIn,
            createUserWithUsernameAndPassword : createUserWithUsernameAndPassword,
            findUserByCredentials : findUserByCredentials,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            updateUser : updateUser,
            deleteUser : deleteUser
        }

        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function login(username, password) {
            var user = {
                username: username + "",
                password: password + ""
            }
            var url = "/api/login";
            return $http.post(url,user);
        }

        function register(username, password) {
            var user = {
                username: username + "",
                password: password + ""
            }
            var url = "/api/register";
            return $http.post(url,user);
        }

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