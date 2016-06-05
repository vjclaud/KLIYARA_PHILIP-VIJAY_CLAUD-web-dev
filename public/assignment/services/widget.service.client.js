(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
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
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url,widget);
        }

        function createWidgetOfType(pageId, widgetType) {
            var widget = {
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
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url = "/api/widget/" + widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId){
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function getWidgetTemplates() {
            var url = "/api/widget/widgetTemplates";
            return $http.get(url);
        }
    }
})();