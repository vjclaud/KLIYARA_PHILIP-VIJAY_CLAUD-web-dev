(function () {
    angular
        .module("MovieSuggester")
        .controller("AdminViewController", AdminViewController);

    function AdminViewController($routeParams, MUserService, $location, $rootScope) {
        var vm = this;
        vm.title = "Admin";
        

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
                .deleteUser(usr.uid)
                .then(
                    function (response) {
                        vm.users.splice(vm.users.indexOf(usr), 1);

                    },
                    function () {
                        vm.error = "Account could not be deleted";
                    }
                );
        }

        function checkDisplay(person) {
            if(vm.followingList){
                return person._id != vm.uid;
            }else{
                if(vm.currentUser.following ==null || vm.currentUser.following=='undefined'){
                    return person._id != vm.uid;
                }else{
                    return person._id != vm.uid && vm.currentUser.following[person._id] == null;
                }

            }

        }




        function follow(person) {




            if(vm.currentUser && person){
                if(vm.currentUser.following ){
                    if(vm.currentUser.following[person._id]==null){
                        vm.currentUser.following[person._id] = person._id;
                    }
                }else{
                    vm.currentUser.following = {};
                    vm.currentUser.following[person._id] = person._id;
                }
            }

            MUserService
                .updateUser(vm.uid, vm.currentUser)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );

            if(vm.users){
                vm.users.splice(vm.users.indexOf(person), 1);
            }
        }

        function unFollow(person) {

            if(vm.currentUser && person){
                if(vm.currentUser.following ){
                    delete vm.currentUser.following[person._id];
                }
            }

            MUserService
                .updateUser(vm.uid, vm.currentUser)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );

            if(vm.users){
                vm.users.splice(vm.users.indexOf(person), 1);
            }
        }


    }

})();