(function () {
    angular
        .module("MovieSuggester")
        .controller("DetailViewController", DetailViewController);

    function DetailViewController($location, TMDBService, $timeout, $routeParams) {
        var vm = this;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.displayLoginMessage = displayLoginMessage;
        vm.mid = $routeParams['mid'];
        
        init();
        
        function init() {
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