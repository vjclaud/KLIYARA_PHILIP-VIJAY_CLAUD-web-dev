(function () {
    angular
        .module("MovieSuggester")
        .factory("MUserService", MUserService);


    function MUserService($http) {
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
            return $http.post("/api/m/logout");
        }

        function loggedIn() {
            return $http.get("/api/m/loggedIn");
        }

        function login(username, password) {
            var user = {
                username: username + "",
                password: password + ""
            }
            var url = "/api/m/login";
            return $http.post(url,user);
        }

        function register(username, password) {
            var user = {
                username: username + "",
                password: password + ""
            }
            var url = "/api/m/register";
            return $http.post(url,user);
        }

        function createUser(user) {
            var url = "/api/m/user";
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
            var url = "/api/m/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/m/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/m/user?username=" + username + "&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {

            var url = "/api/m/user/" + userId;
            return $http.put(url,user);
        }

        function deleteUser(userId) {
            var url = "/api/m/user/" + userId;
            return $http.delete(url);
        }

    }
})();