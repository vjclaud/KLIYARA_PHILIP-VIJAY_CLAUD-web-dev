(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginViewController", LoginViewController);

    function LoginViewController($location, UserService) {

        vm = this;
        vm.login = function (username, password) {
            vm.loginForm.$setSubmitted();
            if(vm.loginForm.$invalid){
                vm.error = "Fields can not be empty";
                return;
            }
            UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if(user._id){
                            $location.url("/user/" + user._id);
                        }else{
                            vm.error = "user couldn't be found"
                        }
                    },
                    function (err) {
                        if(err.status == 401){
                            vm.error = "incorrect credentials";
                        }else{
                            vm.error = err.data;
                        }
                    }
                )

        };
    };

})();