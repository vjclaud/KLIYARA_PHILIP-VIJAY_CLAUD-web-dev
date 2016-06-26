module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Review", ReviewSchema);
    var api = {
        createReviewWithUserAndMovieId : createReviewWithUserAndMovieId,
        findReviewsByUserIdAndMovieId : findReviewsByUserIdAndMovieId,
        findReviewsByMovieId : findReviewsByMovieId,
        findReviewsByUserId : findReviewsByUserId,
        updateReviewWithId : updateReviewWithId,
        deleteReviewById : deleteReviewById
    };
    return api;


    function createReviewWithUserAndMovieId(userId, movieId, review) {
        var reviewObj = {
            'movieId' : movieId,
            'userId' : userId,
            'review' : review
        }
        return Review.create(reviewObj);
    }

    function findReviewsByUserIdAndMovieId(userId, movieId) {
        return Movie.findOne({movieId : movieId, userId : userId});
    }

    function findReviewsByMovieId(mid) {
        return Review.find({movieId : mid});
    }

    function findReviewsByUserId(uid) {
        return Review.find({userId : uid});
    }

    function updateReviewWithId(reviewId, review) {
        delete review._id;
        return Review
            .update(
                {_id : reviewId},{
                    $set : {review : review}
                }
            );
    }

    function deleteReviewById(reviewId) {
        return Review.remove({_id : reviewId});
    }
};