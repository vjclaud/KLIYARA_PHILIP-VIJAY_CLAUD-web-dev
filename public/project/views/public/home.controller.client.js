(function () {
    angular
        .module("MovieSuggester")
        .controller("HomeViewController", HomeViewController);

    function HomeViewController($location, TMDBService) {
        var vm = this;
        vm.page = 0;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLimitedText = getLimitedText;

        init();

        function init() {
            vm.page = 1;
            TMDBService
                .findMoviesByParameters()
                .then(
                    function (response) {
                        vm.tmdbData = response.data;
                        console.log(response);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }
        
        function getLimitedText(text) {
            //console.log('' + $('overview') + '');
            return text;
        }
    };
//ng-style="'line-height': '1.4', '-webkit-line-clamp': '{{poster.style.height/1.4}}'"
})();