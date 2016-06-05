module.exports = function(app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    var widgetTemplates = [
        { "widgetType": "HEADER", "label": "Header"},
        { "widgetType": "IMAGE", "label": "Image"},
        { "widgetType": "YOUTUBE", "label": "Youtube"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", getWidgets);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res){
        var widget = req.body;
        widget._id = (new Date()).getTime() + "";
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params['pageId'];
        var pageWidgets = [];

        for(var i in widgets){
            if(widgets[i].pageId === pageId +""){
                pageWidgets.push(widgets[i]);
            }
        }
        res.send(pageWidgets);
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
        for(var i in widgets){
            if(widgets[i]._id === widgetId +""){
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});
    }

    function updateWidget(req, res){
        var widgetId = req.params['widgetId'];
        var updatedWidget = req.body;
        for(var i in widgets){
            if(widgets[i]._id === widgetId +""){
                if (updatedWidget.name) widgets[i].name = updatedWidget.name ? updatedWidget.name + "" : "";
                if (updatedWidget.text) widgets[i].text = updatedWidget.text? updatedWidget.text + "" : "";
                if (updatedWidget.size) widgets[i].size = updatedWidget.size ? updatedWidget.size : 1;
                if (updatedWidget.url) widgets[i].url = updatedWidget.url ? updatedWidget.url + "" : "";
                if (updatedWidget.width) widgets[i].width = updatedWidget.width ? updatedWidget.width + "" : "100%";
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req, res){
        var widgetId = req.params['widgetId'];
        for(var i in widgets){
            if(widgets[i]._id === widgetId+""){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    
    function getWidgetTemplates(res) {
        res.send(widgetTemplates);
    }
};