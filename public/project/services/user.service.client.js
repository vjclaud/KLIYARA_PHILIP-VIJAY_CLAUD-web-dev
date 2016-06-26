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
            findAllUsers : findAllUsers,
            updateUser : updateUser,
            deleteUser : deleteUser,
            addMovieToLikeList : addMovieToLikeList,
            removeMovieFromLikeList : removeMovieFromLikeList,
            addMovieToWatchList : addMovieToWatchList,
            removeMovieFromWatchList : removeMovieFromWatchList,
            addMovieToDislikeList : addMovieToDislikeList,
            removeMovieFromDislikeList : removeMovieFromDislikeList,
            findUsersWithIds : findUsersWithIds
        }

        return api;
        
        function findAllUsers() {
            var url = "/api/m/user";
            return $http.get(url);
        }

        function findUsersWithIds(ids) {
            var url = "/api/m/user/ids";
            return $http.post(url,ids);
        }

        function addMovieToLikeList(userId, movie) {

            var url = "/api/m/user/" + userId + "/addMovieToLikeList";
            return $http.put(url,movie);
        }

        function removeMovieFromLikeList(userId, movie) {

            var url = "/api/m/user/" + userId + "/removeMovieFromLikeList";
            return $http.put(url,movie);
        }

        function addMovieToWatchList(userId, movie) {

            var url = "/api/m/user/" + userId + "/addMovieToWatchList";
            return $http.put(url,movie);
        }

        function removeMovieFromWatchList(userId, movie) {

            var url = "/api/m/user/" + userId + "/removeMovieFromWatchList";
            return $http.put(url,movie);
        }

        function addMovieToDislikeList(userId, movie) {

            var url = "/api/m/user/" + userId + "/addMovieToDislikeList";
            return $http.put(url,movie);
        }

        function removeMovieFromDislikeList(userId, movie) {

            var url = "/api/m/user/" + userId + "/removeMovieFromDislikeList";
            return $http.put(url,movie);
        }
        

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