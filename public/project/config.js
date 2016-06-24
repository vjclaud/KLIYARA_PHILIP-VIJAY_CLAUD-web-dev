 (function () {
    angular
        .module("MovieSuggester")
        .config(Config);

    function Config ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/public/home.view.client.html",
                controller : "HomeViewController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo : "/"
            })
    }
})();