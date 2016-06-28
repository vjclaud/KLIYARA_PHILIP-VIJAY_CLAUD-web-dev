(function () {
    angular
        .module("MovieSuggester")
        .controller("AdminViewController", AdminViewController);

    function AdminViewController($routeParams, MUserService, $location, $rootScope) {
        var vm = this;
        vm.title = "Admin";
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
        

        if($routeParams['uid']){
            vm.uid = $routeParams['uid'];
        }else{
            vm.uid = $rootScope.currentUser._id;
        }

        function init() {
            MUserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                    
                    if(vm.user.admin != true){
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
                    }else{
                        MUserService
                            .findAllUsers()
                            .then(function (response) {
                                vm.users = response.data;
                            })
                    }
                })

        }

        init();
        
        
        function unregisterUser(usr) {
            $('#myModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();

            MUserService
                .deleteUser(usr._id)
                .then(
                    function (response) {
                        vm.users.splice(vm.users.indexOf(usr), 1);

                    },
                    function () {
                        vm.error = "Account could not be deleted";
                    }
                );
        }








    }

})();