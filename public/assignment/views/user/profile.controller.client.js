(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    function ProfileViewController($routeParams, UserService, $location) {
        var vm = this;
        var uid = $routeParams['uid'];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        
        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                })

        }

        init();

        function unregisterUser() {
            UserService
                .deleteUser(uid)
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        vm.message = "Account could not be deleted";
                    }
                );
        }

        function updateUser(newUser) {
            UserService
                .updateUser(uid, newUser)
                .then(
                    function (response) {
                        vm.message = "Your profile was updated successfully";
                    },
                    function () {
                        vm.message = "Couldn't update profile";
                    }
                );
        }

    }
    
})();