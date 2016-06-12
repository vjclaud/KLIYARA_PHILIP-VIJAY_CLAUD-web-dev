module.exports = function(app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params['websiteId'];
        var page = req.body;
        pageModel
            .createPage(websiteId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.send({});
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var updatedPage = req.body;
        pageModel
            .updatePage(pageId, updatedPage)
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

    function deletePage(req, res) {
        var pageId = req.params['pageId'];
        pageModel
            .deletePage(pageId)
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