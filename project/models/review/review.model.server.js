module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server.js")();
    var Review = mongoose.model("Review", ReviewSchema);
    var api = {
        createReview : createReview,
        findReviewsByUserIdAndMovieId : findReviewsByUserIdAndMovieId,
        findReviewsByMovieId : findReviewsByMovieId,
        findReviewsByUserId : findReviewsByUserId,
        updateReviewWithId : updateReviewWithId,
        deleteReviewById : deleteReviewById,
        deleteReviewsByUserIdAndMovieId : deleteReviewsByUserIdAndMovieId
    };
    return api;


    function createReview(review) {
        console.log(review);
        return Review.create(review);
    }

    function findReviewsByUserIdAndMovieId(userId, movieId) {
        return Review.findOne({movieId : movieId, userId : userId});
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
                    $set : review
                }
            );
    }

    function deleteReviewById(reviewId) {
        return Review.remove({_id : reviewId});
    }

    function deleteReviewsByUserIdAndMovieId(userId, movieId) {
        return Review.remove({movieId : movieId, userId : userId});
    }
};