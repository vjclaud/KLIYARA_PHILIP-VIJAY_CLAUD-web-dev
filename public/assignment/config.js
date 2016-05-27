(function () {
    angular
        .module("WebAppMaker")
        .config(Config);
    
    function Config ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl : "views/user/login.view.client.html"
            })
            .when("/register", {
                templateUrl : "views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl : "views/user/profile.view.client.html"
            })

            .when("/page-edit", {
                templateUrl : "views/page/page-edit.view.client.html"
            })
            .when("/page-list", {
                templateUrl : "views/page/page-list.view.client.html"
            })
            .when("/page-new", {
                templateUrl : "views/page/page-new.view.client.html"
            })

            .when("/website-edit", {
                templateUrl : "views/website/website-edit.view.client.html"
            })
            .when("/website-list", {
                templateUrl : "views/website/website-list.view.client.html"
            })
            .when("/website-new", {
                templateUrl : "views/website/website-new.view.client.html"
            })

            .when("/widget-chooser", {
                templateUrl : "views/widget/widget-chooser.view.client.html"
            })
            .when("/widget-heading", {
                templateUrl : "views/widget/widget-heading.view.client.html"
            })
            .when("/widget-image", {
                templateUrl : "views/widget/widget-image.view.client.html"
            })
            .when("/widget-list", {
                templateUrl : "views/widget/widget-list.view.client.html"
            })
            .when("/widget-youtube", {
                templateUrl : "views/widget/widget-youtube.view.client.html"
            })
    }
})();