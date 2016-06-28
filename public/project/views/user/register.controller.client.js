(function () {
    angular
        .module("MovieSuggester")
        .controller("RegisterViewController", RegisterViewController);

    function RegisterViewController($location, MUserService) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser(username, password, rpassword) {

            vm.registerForm.$setSubmitted();
            if(vm.registerForm.$invalid){
                vm.error = "All fields are required";
                return;
            }
            if(password != rpassword){
                vm.error = "passwords did not match";
            }else{
                MUserService
                    .register(username,password)
                    .then(
                        function (response) {
                            TMDBService.resetSearchObject();
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