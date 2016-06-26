(function () {
    angular
        .module("MovieSuggester")
        .controller("UserListViewController", UserListViewController);

    function UserListViewController($location, TMDBService, $timeout, MUserService, $routeParams) {
        var vm = this;
        var page = 0;
        var busy = false;
        var totalPages = 0;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.viewMovie = viewMovie;
        vm.changeList = changeList;
        vm.uid = $routeParams['uid'];
        vm.lid = $routeParams['lid'];
        vm.addMovieToDislikeList = addMovieToDislikeList;
        vm.addMovieToWatchList = addMovieToWatchList;
        vm.addMovieToLikeList = addMovieToLikeList;

        init();


        function changeList(listType) {

            switch (parseInt(listType))
            {
                case 1:
                    vm.lid = listType;
                    var arr = [];
                    if(vm.user.likeList){
                        for (var key in vm.user.likeList) {
                            arr.push(vm.user.likeList[key]);
                        }
                    }

                    vm.movies = arr;
                    vm.title = "Favorites";
                    $("#likes").addClass("white");
                    $("#dislikes").removeClass("white");
                    $("#watchlist").removeClass("white");
                    break;

                case 2:
                    vm.lid = listType;
                    vm.title = "Dislikes";

                    var arr = [];
                    if(vm.user.dislikeList){
                        for (var key in vm.user.dislikeList) {
                            arr.push(vm.user.dislikeList[key]);
                        }
                    }
                    vm.movies = arr;


                    $("#likes").removeClass("white");
                    $("#dislikes").addClass("white");
                    $("#watchlist").removeClass("white");
                    break;

                default:
                    vm.lid = listType;
                    vm.title = "Watch List";

                    var arr = [];
                    if(vm.user.watchList){
                        for (var key in vm.user.watchList) {
                            arr.push(vm.user.watchList[key]);
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
                    changeList(vm.lid);

                });
        }

        function viewMovie(movie) {
            if(vm.user && movie){
                $location.url("/user/" + vm.user._id + "/list/"+ vm.lid +"/detail/" + movie.id);
            }

        }

        function callRemoveMovieWithMovie(movie) {
            switch (parseInt(vm.lid))
            {
                case 1:
                    delete vm.user.likeList[movie.id];
                    break;

                case 2:
                    delete vm.user.dislikeList[movie.id];
                    break;

                default:

                    delete vm.user.watchList[movie.id];
            }
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
                element.effect( "transfer", { to: $( "#dislikes" ) }, 400 );
            }

            callRemoveMovieWithMovie(movieCopy);
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
                element.effect( "transfer", { to: $( "#watchlist" ) }, 400 );
            }

            callRemoveMovieWithMovie(movieCopy);
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

            callRemoveMovieWithMovie(movieCopy);
            

            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#likes" ) }, 400 );
            }
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