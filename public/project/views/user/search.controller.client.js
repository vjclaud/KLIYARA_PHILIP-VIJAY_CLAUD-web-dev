var searchObject = {
    searchString : "",
    year : "",
    yearType : "After",
    language : "",
    ageLock : true
};

var baseSearchObject = {
    searchString : "",
    year : "",
    yearType : "After",
    language : "",
    ageLock : true
};

(function () {
    angular
        .module("MovieSuggester")
        .controller("UserSearchViewController", UserSearchViewController);

    function UserSearchViewController($location, TMDBService, $routeParams, MUserService) {
        var vm = this;
        vm.search = search;
        var page = 0;
        var busy = false;
        var totalPages = 0;
        vm.tmdbData = null;
        vm.tmdbImageUrl = "http://image.tmdb.org/t/p/w500";
        vm.getLang = getLang;
        vm.myPagingFunction = myPagingFunction;
        vm.searchObject = TMDBService.getSearchObject();
        vm.reset = reset;
        uid = $routeParams['uid'];

        init();

        function init() {

            MUserService
                .findUserById(uid)
                .then(function (response) {
                    vm.user = response.data;
                });

            var i;
            for (i = new Date().getFullYear(); i > 1900; i--)
            {
                $('#yearPicker').append($('<option />').val(i).html(i));
            }

            for (var key in isoLangs) {
                $('#languagePicker').append($('<option />').val(key).html(isoLangs[key].name));
            }
        }

        
        function search() {
            page = 1;
            busy = true;
            TMDBService.setSearchObject(vm.searchObject);
            if(vm.user){
                $location.url("/user/" + vm.user._id);
            }
            
        }

        function getLang(lang) {
            if(getLang){
                var language = isoLangs[lang];
                if(language && language['name']){
                    return " " + language.name;
                }
            }else{
                return "";
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