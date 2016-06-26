module.exports = function () {

    var mongoose = require("mongoose");
    var MovieSchema = require("./movie.schema.server")();
    var Movie = mongoose.model("Movie", MovieSchema);
    var api = {
        createMovie : createMovie,
        findMovieById : findMovieById,
        updateMovie : updateMovie,
        deleteMovie : deleteMovie
    };
    return api;


    function createMovie(movie) {
        return Movie.create(movie);
    }

    function findMovieById(movieId) {
        return Movie.findOne({id : movieId});
    }

    function updateMovie(movieId, movie) {
        delete movie.id;
        return Movie
            .update(
                {id : movieId},{
                    $set : movie
                }
            );
    }

    function deleteMovie(movieId) {
        return Movie.remove({id : movieId});
    }
};