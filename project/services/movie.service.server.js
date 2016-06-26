module.exports = function(app, models) {

    var movieModel = models.movieModel;

    app.post("/api/m/movie", createMovie);
    app.get("/api/movie/:movieId", findMovieById);
    app.put("/api/movie/:movieId", updateMovie);
    app.delete("/api/movie/:movieId", deleteMovie);



    function findMovieById(req, res) {
        var movieId = req.params['movieId'];
        movieModel
            .findMovieById(movieId)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createMovie(req, res) {
        var movieId = req.params['movieId'];
        var movie = req.body;
        movieModel
            .createMovie(movie)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function updateMovie(req, res) {
        var movieId = req.params['movieId'];
        var movie = req.body;
        movieModel
            .updateMovie(movieId, movie)
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

    function deleteMovie(req, res) {
        var movieId = req.params['movieId'];
        movieModel
            .deleteMovie(movieId)
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