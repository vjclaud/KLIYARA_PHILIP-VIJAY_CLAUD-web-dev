(function () {
    angular
        .module("MovieSuggester")
        .controller("UserHomeViewController", UserHomeViewController);

    function UserHomeViewController($location, TMDBService, $timeout, $routeParams, MUserService) {
        var vm = this;
        var page = 0;
        var busy = false;
        var totalPages = 0;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.myPagingFunction = myPagingFunction;
        vm.addMovieToDislikeList = addMovieToDislikeList;
        vm.addMovieToWatchList = addMovieToWatchList;
        vm.addMovieToLikeList = addMovieToLikeList;
        vm.viewMovie = viewMovie;
        vm.movieList = null;
        var uid = $routeParams['uid'];

        init();

        function init() {
            page = 1;
            busy = true;

            MUserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                    vm.movieList = {};

                    if(vm.user.watchList){
                        vm.movieList  = $.extend({}, vm.movieList, vm.user.watchList);
                    }

                    if(vm.user.likeList){
                        vm.movieList  = $.extend({}, vm.movieList, vm.user.likeList);
                    }

                    if(vm.user.dislikeList){
                        vm.movieList  = $.extend({}, vm.movieList, vm.user.dislikeList);
                    }


                    TMDBService
                        .discoverMovies()
                        .then(
                            function (response) {
                                busy = false;
                                vm.tmdbData = response.data;
                                if(response.data.total_pages){
                                    totalPages = response.data.total_pages;
                                }
                                var tempMovies  = [];
                                if(vm.tmdbData.results.length >= 20){
                                    for (var key in vm.tmdbData.results){
                                        var movie = vm.tmdbData.results[key];
                                        if(vm.movieList[movie.id] == null){
                                            tempMovies.push(movie);
                                        }
                                    }

                                    vm.tmdbData.results = tempMovies;

                                    if(tempMovies.length < 20){
                                        myPagingFunction();
                                    }
                                }

                                console.log(response);
                            },
                            function (err) {
                                busy = false;
                                console.log(err);
                            }
                        );

                },
                function (err) {
                    TMDBService
                        .discoverMovies()
                        .then(
                            function (response) {
                                busy = false;
                                vm.tmdbData = response.data;
                                if(response.data.total_pages){
                                    totalPages = response.data.total_pages;
                                }

                                var tempMovies  = [];
                                if(vm.tmdbData.results.length >= 20){
                                    for (var key in vm.tmdbData.results){
                                        var movie = vm.tmdbData.results[key];
                                        if(vm.movieList[movie.id] == null){
                                            tempMovies.push(movie);
                                        }
                                    }

                                    vm.tmdbData.results = tempMovies;

                                    if(tempMovies.length < 20){
                                        myPagingFunction();
                                    }
                                }

                                console.log(response);
                            },
                            function (err) {
                                busy = false;
                                console.log(err);
                            }
                        );
                });


        }

        function viewMovie(movie) {
            if(vm.user && movie){
                $location.url("/user/" + vm.user._id + "/detail/" + movie.id);
            }

        }

        function addMovieToDislikeList($event, $index, movie) {
            movie = getSmallMovie(movie);
            var movieCopy = angular.copy(movie);
            vm.tmdbData.results.splice($index, 1);

            if(vm.tmdbData.results.length < 4){
                myPagingFunction()
            }

            if(vm.user.dislikeList){
                if(vm.user.dislikeList[movieCopy.id]==null){
                    vm.user.dislikeList[movieCopy.id] = angular.copy(movieCopy);
                }
            }else{
                vm.user.dislikeList = {};
                vm.user.dislikeList[movieCopy.id] = angular.copy(movieCopy);
            }


            if($event && $event.target.id){
                $( "#" + $event.target.id.substring(2) ).toggle("blind");
            }

            MUserService
                .updateUser(uid, vm.user)
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
            movie = getSmallMovie(movie);
            var movieCopy = angular.copy(movie);
            vm.tmdbData.results.splice($index, 1);

            if(vm.tmdbData.results.length < 4){
                myPagingFunction()
            }

            if(vm.user.watchList){
                if(vm.user.watchList[movieCopy.id]==null){
                    vm.user.watchList[movieCopy.id] = angular.copy(movieCopy);
                }
            }else{
                vm.user.watchList = {};
                vm.user.watchList[movieCopy.id] = angular.copy(movieCopy);
            }

            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#listLocation" ) }, 400 );
            }
            MUserService
                .updateUser(uid, vm.user)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );
        }


        function getSmallMovie(movie){
            if(movie){

                var newMovie = {
                    id : movie.id,
                    title : movie.title
                }
                if(movie.overview){
                    newMovie['overview'] = movie.overview;
                }

                if(movie.poster_path){
                    newMovie['poster_path'] = movie.poster_path;
                }

                if(movie.original_language){
                    newMovie['original_language'] = movie.original_language;
                }

                if(movie.release_date){
                    newMovie['release_date'] = movie.release_date;
                }

                return newMovie;

            }else{
                return movie;
            }
        }

        function addMovieToLikeList($event, $index, movie){

            movie = getSmallMovie(movie);
            var movieCopy = angular.copy(movie);
            vm.tmdbData.results.splice($index, 1);

            if(vm.tmdbData.results.length < 4){
                myPagingFunction()
            }

            if(vm.user.likeList){
                if(vm.user.likeList[movieCopy.id]==null){
                    vm.user.likeList[movieCopy.id] = angular.copy(movieCopy);
                }
            }else{
                vm.user.likeList = {};
                vm.user.likeList[movieCopy.id] = angular.copy(movieCopy);
            }

            if($event && $event.target.id){
                var element = $("#" + $event.target.id.substring(2));
                element.effect( "transfer", { to: $( "#listLocation" ) }, 400 );
            }

            MUserService
                .updateUser(uid, vm.user)
                .then(
                    function (response) {
                        console.log("Movies updated");
                    },
                    function () {
                        console.log("Couldn't update movies");
                    }
                );
        }

        function myPagingFunction() {
            if(busy == false){
                busy = true;
                if(page < totalPages){
                    page = page + 1;
                }else{
                    busy = false;
                    return;
                }
                        TMDBService
                            .discoverMoviesByPage(page)
                            .then(
                                function (response) {
                                    busy = false;
                                    if(response.data.results && vm.tmdbData.results){
                                        vm.tmdbData.results = vm.tmdbData.results.concat(response.data.results);
                                    }

                                    var tempMovies  = [];
                                    if(vm.tmdbData.results.length >= 20){
                                        for (var key in vm.tmdbData.results){
                                            var movie = vm.tmdbData.results[key];
                                            if(vm.movieList[movie.id] == null){
                                                tempMovies.push(movie);
                                            }
                                        }

                                        vm.tmdbData.results = tempMovies;

                                        if(tempMovies.length < 20){
                                            myPagingFunction();
                                        }
                                    }
                                },
                                function (err) {
                                    busy = false;
                                }
                            );
            }
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