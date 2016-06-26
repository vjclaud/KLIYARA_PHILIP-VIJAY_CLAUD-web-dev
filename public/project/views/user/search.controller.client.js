(function () {
    angular
        .module("MovieSuggester")
        .controller("UserSearchViewController", UserSearchViewController);

    function UserSearchViewController($scope, $location, TMDBService, $routeParams, MUserService) {
        var vm = this;
        vm.search = search;
        var page = 0;
        var busy = false;
        var totalPages = 0;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.myPagingFunction = myPagingFunction;
        vm.searchObject = TMDBService.getSearchObject();
        vm.reset = reset;
        var uid = $routeParams['uid'];
        vm.isoGenres = isoGenres.genres;
        vm.years = [];
        for (i = new Date().getFullYear(); i > 1900; i--)
        {
            vm.years.push(i);
        }
        

        init();

        function init() {

            MUserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });
        }

        
        function search() {
            page = 1;
            busy = true;
            TMDBService.setSearchObject(vm.searchObject);
            if(vm.user){
                $location.url("/user/" + vm.user._id);
            }
            
        }
        
        function reset() {
            vm.searchObject = TMDBService.resetSearchObject();
        }

        function myPagingFunction(text) {

            var parameters = "";
            if(busy == false){
                busy = true;
                if(page < totalPages){
                    page = page + 1;
                }else{
                    return;
                }
                    TMDBService
                        .findMoviesByTextAndPage(text, page)
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
    };
//ng-style="'line-height': '1.4', '-webkit-line-clamp': '{{poster.style.height/1.4}}'"
})();