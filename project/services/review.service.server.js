module.exports = function(app, models) {

    var reviewModel = models.reviewModel;

    app.post("/api/m/user/:userId/movie/:movieId/review", createReview);
    app.get("/api/m/user/:userId/movie/:movieId/review", findReviewsByUserIdAndMovieId);
    app.get("/api/m/movie/:movieId/review", findReviewsByMovieId);
    app.get("/api/m/user/:userId/review", findReviewsByUserId);
    app.put("/api/m/review/:reviewId", updateReview);
    app.delete("/api/m/review/:reviewId", deleteReview);


    function findReviewsByUserIdAndMovieId() {
        var userId = req.params['userId'];
        var movieId = req.params['movieId'];
        reviewModel
            .findReviewsByUserIdAndMovieId(userId,movieId)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    function createReview(req, res) {
        var userId = req.params['userId'];
        var movieId = req.params['movieId'];
        var review = req.body;
        reviewModel
            .createReviewWithUserAndMovieId(userId, movieId, review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function findReviewsByMovieId(req, res) {
        var movieId = req.params['movieId'];
        reviewModel
            .findReviewsByMovieId(movieId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findReviewsByUserId(req, res) {
        var userId = req.params['userId'];
        reviewModel
            .findReviewsByUserId(userId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    

    function updateReview(req, res) {
        var reviewId = req.params['reviewId'];
        var review = req.body;
        reviewModel
            .updateReviewWithId(reviewId, review)
            .then(
                function (stats) {
                    console.log(stats);
                    res.json(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params['reviewId'];
        reviewModel
            .deleteReviewById(reviewId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.json(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }


};