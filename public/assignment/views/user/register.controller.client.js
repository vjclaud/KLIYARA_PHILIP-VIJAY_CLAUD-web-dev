(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterViewController", RegisterViewController);

    function RegisterViewController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;
        
        function registerUser(username, password, rpassword) {
            if(!username || username.length < 3){
                vm.error = "username must be at least 3 characters long";
            }else if(!password || password.length < 3){
                vm.error = "password must be at least 3 characters long";
            }else if(password != rpassword){
                vm.error = "passwords did not match";
            }else{
                UserService
                    .register(username,password)
                    .then(
                        function (response) {
                        var user = response.data;
                        $location.url("/user/" + user._id);
                    },
                    function (response) {
                        vm.error = response.data;
                    });


            }
        }
    }

})();