(function () {
    angular
        .module("MovieSuggester")
        .factory("ReviewService", ReviewService);


    function ReviewService($http) {
        var api = {
            createReview : createReview,
            findReviewsByUserIdAndMovieId : findReviewsByUserIdAndMovieId,
            findReviewsByMovieId : findReviewsByMovieId,
            findReviewsByUserId : findReviewsByUserId,
            updateReview : updateReview,
            deleteReview : deleteReview,
            hardDeleteReview : hardDeleteReview
        }

        return api;

        function createReview(review) {
            var url = "/api/m/review";
            return $http.post(url,review);
        }


        function findReviewsByUserIdAndMovieId(userId, movieId){
            var url = "/api/m/user/" + userId + "/movie/" + movieId + "/review";
            return $http.get(url);
        }

        function findReviewsByMovieId(movieId){
            var url = "/api/m/movie/" + movieId + "/review";
            return $http.get(url);
        }

        function findReviewsByUserId(userId){
            var url = "/api/m/user/" + userId + "/review";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/api/m/review/" + reviewId;
            return $http.put(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/api/m/review/" + reviewId;
            return $http.delete(url);
        }

        function hardDeleteReview(userId, movieId) {
            var url = "/api/m/user/" + userId + "/movie/" + movieId;
            return $http.delete(url);
        }
    }
})();