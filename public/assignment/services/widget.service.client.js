(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

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
    ]

    var widgetTemplates = [
        { "widgetType": "HEADER", "label": "Header"},
        { "widgetType": "IMAGE", "label": "Image"},
        { "widgetType": "YOUTUBE", "label": "Youtube"}
    ]

    function WidgetService() {
        var api = {
            createWidget : createWidget,
            createWidgetOfType : createWidgetOfType,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            getWidgetTemplates : getWidgetTemplates
        }

        return api;

        function createWidget(pageId, widget) {
            widgets.push(widget);
            return widget;
        }

        function createWidgetOfType(pageId, widgetType) {
            var widget = {
                "_id": (new Date()).getTime() + "",
                "pageId" : pageId + "",
                "name": "",
                "text": ""
            };

            if(widgetType + "" === "HEADER"){
                widget['size'] = 1;
            }

            if(widgetType + "" === "IMAGE" || widgetType + "" === "YOUTUBE"){
                widget['width'] = "100%";
                widget['url'] = ""
            }
            widget['widgetType'] = widgetType + "";

            return createWidget(pageId, widget);
        }

        function findWidgetsByPageId(pageId){
            var userWidgets = [];

            for(var i in widgets){
                if(widgets[i].pageId === pageId +""){
                    userWidgets.push(widgets[i]);
                }
            }
            return userWidgets;
        }

        function findWidgetById(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId +""){
                    return widgets[i];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            var userWidget = findWidgetById(widgetId);
            if(userWidget){
                if (widget.name) userWidget.name = widget.name ? widget.name + "" : "";
                if (widget.text) userWidget.text = widget.text? widget.text + "" : "";
                if (widget.size) userWidget.size = widget.size ? widget.size : 1;
                if (widget.url) userWidget.url = widget.url ? widget.url + "" : "";
                if (widget.width) userWidget.width = widget.width ? widget.width + "" : "100%";
                return true;
            }
            return false;
        }

        function deleteWidget(widgetId){
            for(var i in widgets){
                if(widgets[i]._id === widgetId+""){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }

        function getWidgetTemplates() {
            return widgetTemplates;
        }
    }
})();