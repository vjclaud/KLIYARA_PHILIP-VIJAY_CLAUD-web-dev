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
            if(UserService.updateUserById(id, newUser)){
                vm.message = "Your profile was updated successfully";
            }else{
                vm.message = "Couldn't update profile"
            }
        }

    }


    
})();