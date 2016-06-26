(function () {
    angular
        .module("MovieSuggester")
        .controller("UserDetailViewController", UserDetailViewController);

    function UserDetailViewController($location, TMDBService, $timeout, $routeParams, MUserService) {
        var vm = this;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.displayLoginMessage = displayLoginMessage;
        vm.mid = $routeParams['mid'];
        vm.uid = $routeParams['uid'];
        vm.lid = $routeParams['lid'];
        vm.pid = $routeParams['pid'];
        vm.backPressed = backPressed;
        vm.removeFromAllLists = removeFromAllLists;

        $(document).ready(function () {


            if(window.location.href.indexOf("following/") > -1) {
                vm.followingList = true;
                vm.title = "Following";
                vm.showRemove = false;
            }else if(window.location.href.indexOf("person/") > -1) {
                vm.title = "Find People";
                vm.personList = true;
                vm.showRemove = false;
            }else if(window.location.href.indexOf("list/") > -1) {
                vm.backToList = true;
                vm.showRemove = true;
            }
        });
        
        init();

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

        function removeFromAllLists(movie){

            movie = getSmallMovie(movie);
            var movieCopy = angular.copy(movie);

            if(vm.user.likeList){
                delete vm.user.likeList[movieCopy.id];
            }

            if(vm.user.dislikeList){
                delete vm.user.dislikeList[movieCopy.id];
            }

            if(vm.user.watchList){
                delete vm.user.watchList[movieCopy.id];
            }

            MUserService
                .updateUser(vm.uid, vm.user)
                .then(
                    function (response) {
                        vm.message = "Removed from all lists";
                        vm.showRemove = false;
                        console.log("Movies updated");
                    },
                    function () {
                        vm.error = "Couldn't remove movie";
                        console.log("Couldn't update movies");
                    }
                );
        }


        function backPressed() {
            if(vm.backToList){
                $location.url("/user/" + vm.uid + "/list/" + vm.lid);
            }else if(vm.personList){
                var url = "/user/" + vm.uid + "/person/" + vm.pid + "/list/" + vm.lid;
                $location.url(url);
            }else if(vm.followingList){
                var url = "/user/" + vm.uid + "/following/" + vm.pid + "/list/" + vm.lid;
                $location.url(url);
            }
            else{
                $location.url("/user/" + vm.uid);
            }
        }


        
        function init() {

            MUserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                });

            TMDBService
                .getMovieById(vm.mid)
                .then(
                    function (response) {
                        busy = false;
                        vm.movie = response.data;
                    },
                    function (err) {
                        busy = false;
                        console.log(err);
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
            var returnLang = ""
            if(isoLangs[lang]){
                var language = isoLangs[lang];
                if(language && language.name){
                    returnLang =  language.name;
                    if(language.name != language.nativeName){
                        returnLang = returnLang  + " (" + language.nativeName + ")";
                    }
                }
            }

            return returnLang;
        }


    };
})();