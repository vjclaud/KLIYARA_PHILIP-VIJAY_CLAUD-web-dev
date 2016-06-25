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
        vm.displayLoginMessage = displayLoginMessage;
        vm.viewMovie = viewMovie;
        uid = $routeParams['uid'];

        init();

        function init() {
            page = 1;
            busy = true;

            MUserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });

            TMDBService
                .discoverMovies()
                .then(
                    function (response) {
                        busy = false;
                        vm.tmdbData = response.data;
                        if(response.data.total_pages){
                            totalPages = response.data.total_pages;
                        }

                        console.log(response);
                    },
                    function (err) {
                        busy = false;
                        console.log(err);
                    }
                );
        }

        function viewMovie(movie) {
            if(vm.user && movie){
                $location.url("/user/" + vm.user._id + "/detail/" + movie.id);
            }

        }

        function displayLoginMessage() {
            vm.loginMessage = "Log in to use these features";
            $timeout(function() {
                vm.loginMessage = null;
            }, 3000);
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