(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginViewController", LoginViewController);

    function LoginViewController($location, UserService) {

        vm = this;
        vm.login = function (username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user){
                $location.url("/user/" + user._id);
            }else{
                vm.error = "user couldn't be found"
            }
        };
    };

})();