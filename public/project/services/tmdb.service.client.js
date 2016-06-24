(function () {
    angular
        .module("MovieSuggester")
        .factory("TMDBService", TMDBService);

    var key = "4eff5a432c614a57e1c9704c95d67ee5";
    var discoverUrl = "http://api.themoviedb.org/3/discover/movie?api_key=API_KEY";
    var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=";
    var imageUrl = "http://image.tmdb.org/t/p/w500IMAGE_PATH";
    var parameterString = "";

    function TMDBService($http) {
        var api = {
            findMoviesByText : findMoviesByText,
            findMoviesByParameters : findMoviesByParameters,
            findWidgetsByPageId : findWidgetsByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget,
            getWidgetTemplates : getWidgetTemplates,
            searchPhotos : searchPhotos,
            updateWidgetOrder : updateWidgetOrder
        }


        return api;

        function findMoviesByText(text) {
            var url = searchUrl.replace("API_KEY", key) + encodeURIComponent(text);
            return $http.get(url);
        }

        function findMoviesByParameters() {
            var url = discoverUrl.replace("API_KEY", key) + encodeURIComponent(parameterString);
            return $http.get(url);
        }

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