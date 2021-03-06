(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    function ProfileViewController($routeParams, UserService, $location, $rootScope) {
        var vm = this;
        var uid
        if($routeParams['uid']){
            uid = $routeParams['uid'];
        }else{
            uid = $rootScope.currentUser._id;
        }

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
            vm.profileForm.$setSubmitted();
            if(vm.profileForm.$invalid){
                vm.error = "Contains invalid fields";
                return;
            }
            vm.error = null;
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