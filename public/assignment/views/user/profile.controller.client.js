(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    function ProfileViewController($routeParams, UserService) {
        var vm = this;
        var uid = $routeParams['uid'];
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                })

        }

        init();

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