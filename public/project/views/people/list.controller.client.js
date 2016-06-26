(function () {
    angular
        .module("MovieSuggester")
        .controller("PersonListViewController", PersonListViewController);

    function PersonListViewController($location, TMDBService, $timeout, MUserService, $routeParams) {
        var vm = this;
        var page = 0;
        var busy = false;
        var totalPages = 0;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.viewMovie = viewMovie;
        vm.changeList = changeList;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.lid = $routeParams['lid'];
        vm.addMovieToDislikeList = addMovieToDislikeList;
        vm.addMovieToWatchList = addMovieToWatchList;
        vm.addMovieToLikeList = addMovieToLikeList;
        var listOwnerName = "";

        init();

        $(document).ready(function () {
            if(window.location.href.indexOf("/following") > -1) {
                vm.followingList = true;
            }else{
            }
        });
        

        function changeList(listType) {

            switch (parseInt(listType))
            {
                case 1:
                    vm.lid = listType;
                    var arr = [];
                    if(vm.person.likeList){
                        for (var key in vm.person.likeList) {
                            arr.push(vm.person.likeList[key]);
                        }
                    }

                    vm.movies = arr;
                    vm.title = listOwnerName + "Favorites";

                    $("#likes").addClass("white");
                    $("#dislikes").removeClass("white");
                    $("#watchlist").removeClass("white");
                    break;

                case 2:
                    vm.lid = listType;
                    vm.title = listOwnerName + "Dislikes";

                    var arr = [];
                    if(vm.person.dislikeList){
                        for (var key in vm.person.dislikeList) {
                            arr.push(vm.person.dislikeList[key]);
                        }
                    }
                    vm.movies = arr;
                    $("#likes").removeClass("white");
                    $("#dislikes").addClass("white");
                    $("#watchlist").removeClass("white");
                    break;

                default:
                    vm.lid = listType;
                    vm.title = listOwnerName + "Watch List";

                    var arr = [];
                    if(vm.person.watchList){
                        for (var key in vm.user.person) {
                            arr.push(vm.user.person[key]);
                        }
                    }
                    vm.movies = arr;
                    $("#likes").removeClass("white");
                    $("#dislikes").removeClass("white");
                    $("#watchlist").addClass("white");

            }
        }

        function init() {
            MUserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                });

            MUserService
                .findUserById(vm.pid)
                .then(function (response) {
                    vm.person = response.data;
                    changeList(vm.lid);
                    if(vm.person.firstName){
                        listOwnerName = vm.person.firstName + "'s ";
                    }else{
                        listOwnerName = vm.person.username + "'s ";
                    }

                    vm.title = listOwnerName + vm.title;
                });

        }

        function viewMovie(movie) {
            if(vm.uid && vm.pid && movie && vm.followingList){
                $location.url("/user/" + vm.uid + "/following/" + vm.pid + "/list/"+ vm.lid +"/detail/" + movie.id);
            }

            if(vm.uid && vm.pid && movie && !vm.followingList){
                $location.url("/user/" + vm.uid + "/person/" + vm.pid + "/list/"+ vm.lid +"/detail/" + movie.id);
            }

        }

        function callRemoveMovieWithMovie(movie) {
            switch (parseInt(vm.lid))
            {
                case 1:
                    delete vm.person.likeList[movie.id];
                    break;

                case 2:
                    delete vm.person.dislikeList[movie.id];
                    break;

                default:

                    delete vm.person.watchList[movie.id];
            }
        }
        


        function addMovieToDislikeList($event, $index, movie) {

            if(vm.user.dislikeList){
                if(vm.user.dislikeList[movie.id]==null){
                    vm.user.dislikeList[movie.id] = angular.copy(movie);
                }
            }else{
                vm.user.dislikeList = {};
                vm.user.dislikeList[movie.id] = angular.copy(movie);
            }



            var movieCopy = angular.copy(movie);
            if(vm.movies){
                vm.movies.splice($index, 1);
            }


            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#saveLocation" ) }, 400 );
            }
            callRemoveMovieWithMovie(movie);

            MUserService
                .updateUser(vm.uid, vm.user)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );

        }

        function addMovieToWatchList($event, $index, movie){

            if(vm.user.watchList){
                if(vm.user.watchList[movie.id]==null){
                    vm.user.watchList[movie.id] = angular.copy(movie);
                }
            }else{
                vm.user.watchList = {};
                vm.user.watchList[movie.id] = angular.copy(movie);
            }



            var movieCopy = angular.copy(movie);
            if(vm.movies){
                vm.movies.splice($index, 1);
            }


            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#saveLocation" ) }, 400 );
            }

            callRemoveMovieWithMovie(movie);

            MUserService
                .updateUser(vm.uid, vm.user)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );

        }

        function addMovieToLikeList($event, $index, movie){


            if(vm.user.likeList){
                if(vm.user.likeList[movie.id]==null){
                    vm.user.likeList[movie.id] = angular.copy(movie);
                }
            }else{
                vm.user.likeList = {};
                vm.user.likeList[movie.id] = angular.copy(movie);
            }

            var movieCopy = angular.copy(movie);
            if(vm.movies){
                vm.movies.splice($index, 1);
            }
            

            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#saveLocation" ) }, 400 );
            }

            callRemoveMovieWithMovie(movie);

            MUserService
                .updateUser(vm.uid, vm.user)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );
        }

        function displayLoginMessage() {
            vm.loginMessage = "Log in to use these features";
            $timeout(function() {
                vm.loginMessage = null;
            }, 3000);
        }


        function getLang(lang) {
            if(isoLangs[lang]){
                var language = isoLangs[lang];
                if(language && language.name){
                    return " " + language.name;
                }
            }else{
                return "";
            }
        }


    };
//ng-style="'line-height': '1.4', '-webkit-line-clamp': '{{poster.style.height/1.4}}'"
})();