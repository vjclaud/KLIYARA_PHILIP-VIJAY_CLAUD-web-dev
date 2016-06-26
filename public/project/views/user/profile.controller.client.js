(function () {
    angular
        .module("MovieSuggester")
        .controller("UserProfileViewController", UserProfileViewController);

    function UserProfileViewController($routeParams, MUserService, $location, $rootScope) {
        var vm = this;
        vm.uid
        if($routeParams['uid']){
            vm.uid = $routeParams['uid'];
        }else{
            vm.uid = $rootScope.currentUser._id;
        }

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;
        
        function logout() {
            MUserService
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
            MUserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                })

        }

        init();

        function unregisterUser() {

            $('#myModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            
            MUserService
                .deleteUser(vm.uid)
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
            MUserService
                .updateUser(vm.uid, newUser)
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