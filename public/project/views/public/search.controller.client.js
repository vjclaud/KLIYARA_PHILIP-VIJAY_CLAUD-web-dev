(function () {
    angular
        .module("MovieSuggester")
        .controller("HomeViewController", HomeViewController);

    function HomeViewController($location, TMDBService) {
        var vm = this;
        vm.search = search;
        vm.page = 0;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";

        function search(text) {
            vm.page = 1;
            TMDBService
                .findMoviesByText(text)
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
    };
//ng-style="'line-height': '1.4', '-webkit-line-clamp': '{{poster.style.height/1.4}}'"
})();