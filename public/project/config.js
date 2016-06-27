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

            .when("/home", {
                templateUrl : "views/public/home.view.client.html",
                controller : "HomeViewController",
                controllerAs : "model"
            })

            .when("/info", {
                templateUrl : "views/public/info.view.client.html"
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

            .when("/detail/:mid", {
                templateUrl : "views/public/detail.view.client.html",
                controller : "DetailViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/profile", {
                templateUrl : "views/user/profile.view.client.html",
                controller : "UserProfileViewController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user/:uid/people", {
                templateUrl : "views/people/people.view.client.html",
                controller : "UserPeopleViewController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }

            })

            .when("/user/:uid/following", {
                templateUrl : "views/people/people.view.client.html",
                controller : "UserPeopleViewController",
                controllerAs : "model"

            })

            .when("/user/:uid/following/:pid/list/:lid", {
                templateUrl : "views/people/list.view.client.html",
                controller : "PersonListViewController",
                controllerAs : "model"

            })

            .when("/user/:uid/person/:pid/list/:lid", {
                templateUrl : "views/people/list.view.client.html",
                controller : "PersonListViewController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }

            })

            .when("/user/:uid/list/:lid", {
                templateUrl : "views/user/list.view.client.html",
                controller : "UserListViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/list/:lid/detail/:mid", {
                templateUrl : "views/user/detail.view.client.html",
                controller : "UserDetailViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/following/:pid/list/:lid/detail/:mid", {
                templateUrl : "views/user/detail.view.client.html",
                controller : "UserDetailViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/person/:pid/list/:lid/detail/:mid", {
                templateUrl : "views/user/detail.view.client.html",
                controller : "UserDetailViewController",
                controllerAs : "model"
            })




            .when("/user/:uid/list/:lid/detail/:mid/review", {
                templateUrl : "views/review/write.review.view.client.html",
                controller : "UserReviewViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/following/:pid/list/:lid/detail/:mid/review", {
                templateUrl : "views/review/write.review.view.client.html",
                controller : "UserReviewViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/person/:pid/list/:lid/detail/:mid/review", {
                templateUrl : "views/review/write.review.view.client.html",
                controller : "UserReviewViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/detail/:mid/review", {
                templateUrl : "views/review/write.review.view.client.html",
                controller : "UserReviewViewController",
                controllerAs : "model"
            })
            
            
            
            
            



            .when("/user/:uid/search", {
                templateUrl : "views/user/search.view.client.html",
                controller : "UserSearchViewController",
                controllerAs : "model"
            })

            .when("/user/:uid/detail/:mid", {
                templateUrl : "views/user/detail.view.client.html",
                controller : "UserDetailViewController",
                controllerAs : "model"
            })

            .when("/user/:uid", {
                templateUrl : "views/user/home.view.client.html",
                controller : "UserHomeViewController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/user", {
                templateUrl : "views/user/home.view.client.html",
                controller : "UserHomeViewController",
                controllerAs : "model",
                resolve : {
                    loggedIn : checkLoggedIn
                }
            })

            .when("/search", {
                templateUrl : "views/public/search.view.client.html",
                controller : "SearchViewController",
                controllerAs : "model"
            })

            .otherwise({
                redirectTo : "/"
            })
    }

     function checkLoggedIn(MUserService, $location, $q, $rootScope) {
         var deffered = $q.defer();
         MUserService
             .loggedIn()
             .then(
                 function (response) {
                     var user = response.data;
                     if(user == '0'){
                         $rootScope.currentUser = null;
                         deffered.reject();
                         $location.url("/login");
                     }else{
                         $rootScope.currentUser = user;
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