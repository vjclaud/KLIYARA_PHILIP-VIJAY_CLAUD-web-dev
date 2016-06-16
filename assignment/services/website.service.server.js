module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.params['userId'];
        var website = req.body;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(
                function (website) {
                    res.json(website);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
    
    function findAllWebsitesForUser(req, res) {
        var userId = req.params['userId'];
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.send({});
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var updatedWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, updatedWebsite)
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

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        websiteModel
            .deleteWebsite(websiteId)
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