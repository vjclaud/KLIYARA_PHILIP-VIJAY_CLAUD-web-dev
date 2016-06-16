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
            getWidgetTemplates : getWidgetTemplates,
            searchPhotos : searchPhotos,
            updateWidgetOrder : updateWidgetOrder
        }

        var key = "2a5913d474436821258dba7b143b1831";
        var secret = "de58d31218cb107c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        return api;

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.post(url,widget);
        }

        function createWidgetOfType(pageId, widgetType) {
            var widget = {
                "name": "",
                "text": ""
            };

            if(widgetType + "" === "HEADER"){
                widget['size'] = 1;
            }

            if(widgetType + "" === "HTML"){
                widget['class'] = "";
            }

            if(widgetType + "" === "TEXT"){
                widget['rows'] = 1;
            }
            
            if(widgetType + "" === "IMAGE" || widgetType + "" === "YOUTUBE" || widgetType + "" === "FLICKR"){
                widget['width'] = 100;
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

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }

        function updateWidgetOrder(widgets) {
            var url = "/api/updateWidgetOrder";
            return $http.post(url, widgets);
        }
    }
})();