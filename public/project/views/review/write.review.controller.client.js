(function () {
    angular
        .module("MovieSuggester")
        .controller("UserReviewViewController", UserReviewViewController);

    function UserReviewViewController($routeParams,$location, MUserService, ReviewService) {

        var vm = this;
        vm.mid = $routeParams['mid'];
        vm.uid = $routeParams['uid'];
        vm.submit = submit;
        vm.remove = remove;
        vm.backPressed = backPressed;

        
        vm.review = {
            movieId : vm.mid,
            userId : vm.uid,
            username : "",
            review : ""
        }
        
        init();


        function backPressed() {
            var url = $location.path().replace("/review", "");
            $location.url(url);
        }

        function submit() {

            if(vm.review && vm.review.review==""){
                vm.message = "Nothing to submit";
                return;
            }

            if(vm.rid && vm.rid!='undefined'){
                ReviewService
                    .updateReview(vm.rid,vm.review)
                    .then(
                        function (response) {
                            vm.message = "Review submitted";
                        },
                        function (error) {
                            vm.message = "Could not submit review. Try again later";
                        }
                    );
            }else{
                ReviewService
                    .createReview(vm.review)
                    .then(
                        function (response) {
                            vm.message = "Review submitted";
                        },
                        function (error) {
                            vm.error = "Could not submit review. Try again later";
                        }
                    );
            }

        }

        function remove() {
            vm.review.review = "";

            if(vm.review && vm.review._id){
                ReviewService
                    .deleteReview(vm.review._id)
                    .then(
                        function (response) {
                            vm.message = "Review deleted";
                        },
                        function (error) {
                        }
                    );
            }


        }
        
        function init() {
            
            ReviewService
                .findReviewsByUserIdAndMovieId(vm.uid,vm.mid)
                .then(
                    function (response) {
                        var rev = response.data;
                        if(rev && rev!='undefined'){
                            vm.rid = rev._id;
                            vm.review._id = rev._id;
                            vm.review.review = rev.review;
                        }

                    });
            
            
            MUserService
                .findUserById(vm.uid)
                .then(function (response) {
                    vm.user = response.data;
                    vm.review.username = vm.user.username;
                });
        }
        
        
        
    };

})();