(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    function ProfileViewController($routeParams, UserService) {
        var vm = this;
        var id = $routeParams.id;
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(id);
        }

        init();

        function updateUser(newUser) {
            vm.user.firstName = newUser.firstName;
            vm.user.email = newUser.email;
            vm.user.lastName = newUser.lastName;


        }

    }


    
})();