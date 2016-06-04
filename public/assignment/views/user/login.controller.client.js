(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginViewController", LoginViewController);

    function LoginViewController($location, UserService) {

        vm = this;
        vm.login = function (username, password) {
            UserService
                .findUserByCredentials(username, password)
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        $location.url("/user/" + user._id);
                    }else{
                        vm.error = "user couldn't be found"
                    }
            })

        };
    };

})();