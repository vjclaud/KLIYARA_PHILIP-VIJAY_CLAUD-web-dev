(function () {
    angular
        .module("WebAppMaker")
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

            .when("/user", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "ProfileViewController",
                controllerAs : "model"
            })


            .when("/user/:uid/website/:wid/page/new", {
                templateUrl : "views/page/page-new.view.client.html",
                controller : "PageNewViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl : "views/page/page-edit.view.client.html",
                controller : "PageEditViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl : "views/page/page-list.view.client.html",
                controller : "PageListViewController",
                controllerAs : "model"
            })


            .when("/user/:uid/website/new", {
                templateUrl : "views/website/website-new.view.client.html",
                controller : "WebsiteNewViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl : "views/website/website-edit.view.client.html",
                controller : "WebsiteEditViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website", {
                templateUrl : "views/website/website-list.view.client.html",
                controller : "WebsiteListViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "WidgetChooserViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/HEADER", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "WidgetChooserViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/IMAGE", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "WidgetChooserViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/YOUTUBE", {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller : "WidgetChooserViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl : "views/widget/widget-flickr-search.view.client.html",
                controller : "WidgetFlickrViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid/html", {
                templateUrl : "views/widget/widget-html.view.client.html",
                controller : "WidgetHtmlViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller : "WidgetEditViewController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller : "WidgetListViewController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo : "/login"
            })
    }

    function checkLoggedIn(UserService, $location, $q) {
        var deffered = $q.defer();
        UserService
            .loggedIn()
            .then(
                function (response) {
                    var user = response.data;
                    if(user == '0'){

                        deffered.reject();
                        $location.url("/login");
                    }else{
                        deffered.resolve();
                    }
                    console.log(user);
                },
                function (response) {
                    $location.url("/login");
                }
            )
        return deffered.promise;
    }
})();