(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileViewController", ProfileViewController);

    function ProfileViewController($routeParams, UserService) {
        var vm = this;
        var uid = $routeParams['uid'];
        vm.updateUser = updateUser;

        function init() {
            vm.user = angular.copy(UserService.findUserById(uid));
        }

        init();

        function updateUser(newUser) {
            var email = newUser.email;
            if(UserService.updateUser(uid, newUser)){
                vm.message = "Your profile was updated successfully";
            }else{
                vm.message = "Couldn't update profile"
            }
        }

    }
    
})();