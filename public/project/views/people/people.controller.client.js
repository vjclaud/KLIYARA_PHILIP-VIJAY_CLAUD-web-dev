(function () {
    angular
        .module("MovieSuggester")
        .controller("UserPeopleViewController", UserPeopleViewController);

    function UserPeopleViewController($routeParams, MUserService, $location, $rootScope) {
        var vm = this;
        vm.viewUser = viewUser;
        vm.follow = follow;
        vm.checkDisplay = checkDisplay;
        vm.unFollow = unFollow;

        $(document).ready(function () {
            if(window.location.href.indexOf("/following") > -1) {
                vm.followingList = true;
                vm.title = "Following";
            }else{
                vm.title = "Find People";
            }
        });

        function viewUser(user) {
            if(vm.followingList){
                $location.url("/user/" + vm.uid + "/following/" + user._id + "/list/0");
            }else{
                $location.url("/user/" + vm.uid + "/person/" + user._id + "/list/0");
            }

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
                    vm.currentUser = response.data;

                    var ids = [];
                    for(var key in vm.currentUser.following){
                        ids.push(vm.currentUser.following[key]);
                    }

                    if(vm.followingList && ids.length > 0){
                        MUserService
                            .findUsersWithIds(ids)
                            .then(function (response) {
                                vm.users = response.data;
                            })
                    }else{
                        MUserService
                            .findAllUsers()
                            .then(function (response) {
                                vm.users = response.data;
                            })
                    }

                });

        }

        init();

        function checkDisplay(person) {
            if(vm.followingList){
                return person._id != vm.uid;
            }else{
                return person._id != vm.uid && vm.currentUser.following[person._id] == null;
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