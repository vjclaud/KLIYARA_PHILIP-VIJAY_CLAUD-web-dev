module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgetTemplates = [
        { "widgetType": "HEADER", "label": "Header"},
        { "widgetType": "IMAGE", "label": "Image"},
        { "widgetType": "YOUTUBE", "label": "Youtube"},
        { "widgetType": "FLICKR", "label": "Flickr"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/updateWidgetOrder", updateWidgetOrder);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", getWidgets);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function updateWidgetOrder(req, res) {
        widgets = req.body;
    }
    function createWidget(req, res){
        var pageId = req.params['pageId'];
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params['pageId'];
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.send({});
                }
            );
    }

    function getWidgets(req, res) {
        var param = req.params['widgetId'];
        if(param == "widgetTemplates"){
            getWidgetTemplates(res);
        }else{
            findWidgetById(req, res);
        }
    }

    function findWidgetById(req, res){
        var widgetId = req.params['widgetId'];
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(req, res){
        var widgetId = req.params['widgetId'];
        var updatedWidget = req.body;
        widgetModel
            .updateWidget(widgetId, updatedWidget)
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

    function deleteWidget(req, res){
        var widgetId = req.params['widgetId'];
        widgetModel
            .deleteWidget(widgetId)
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
    
    function getWidgetTemplates(res) {
        res.send(widgetTemplates);
    }

    function uploadImage(req, res) {
        var uid      = req.body.uid;
        var wid      = req.body.wid;
        var pid      = req.body.pid;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets){
            if(widgets[i]._id === widgetId+""){
                widgets[i].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + widgetId);
    }

};