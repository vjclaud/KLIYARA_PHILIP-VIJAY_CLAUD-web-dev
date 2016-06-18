 (function () {
    angular
        .module("MovieSuggester")
        .config(Config);

    function Config ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginViewController",
                controllerAs : "model"
            })
            .when("/login", {
                templateUrl : "views/user/login.view.client.html",
                controller : "LoginViewController",
                controllerAs : "model"
            })
            .when("/profile", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "LoginViewController",
                controllerAs : "model"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html",
                controller : "RegisterViewController",
                controllerAs : "model"
            })

            .when("/user/:uid", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileViewController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo : "/login"
            })
    }
})();