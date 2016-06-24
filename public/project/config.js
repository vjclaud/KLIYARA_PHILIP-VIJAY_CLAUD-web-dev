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

            .when("", {
                templateUrl : "views/public/home.view.client.html",
                controller : "HomeViewController",
                controllerAs : "model"
            })

            .when("/views/public/home", {
                templateUrl : "views/public/home.view.client.html",
                controller : "HomeViewController",
                controllerAs : "model"
            })

            .when("/views/public/detail/:mid", {
                templateUrl : "views/public/detail.view.client.html",
                controller : "DetailViewController",
                controllerAs : "model"
            })

            .when("/views/public/search", {
                templateUrl : "views/public/search.view.client.html",
                controller : "SearchViewController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo : "/"
            })
    }
})();