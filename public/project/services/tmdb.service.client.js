(function () {
    angular
        .module("MovieSuggester")
        .factory("TMDBService", TMDBService);

    var key = "4eff5a432c614a57e1c9704c95d67ee5";
    var discoverUrl = "http://api.themoviedb.org/3/discover/movie?api_key=API_KEY";
    var searchUrl = "http://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=";
    var imageUrl = "http://image.tmdb.org/t/p/w500IMAGE_PATH";
    var parameterString = "";

    var searchObject = {
        searchString : "",
        year : "",
        yearType : "After",
        language : "",
        ageLock : true
    };

    function TMDBService($http) {
        var api = {
            findMoviesByText : findMoviesByText,
            discoverMovies : discoverMovies,
            discoverMoviesByPage : discoverMoviesByPage,
            findMoviesByTextAndPage : findMoviesByTextAndPage,
            setSearchObject : setSearchObject,
            getSearchObject : getSearchObject,
            resetSearchObject : resetSearchObject,
            searchPhotos : searchPhotos,
            updateWidgetOrder : updateWidgetOrder
        }


        return api;

        function findMoviesByText(text) {
            var url = searchUrl.replace("API_KEY", key) + encodeURIComponent(text);
            return $http.get(url);
        }

        function findMoviesByTextAndPage(text, page) {
            var url = searchUrl.replace("API_KEY", key) + encodeURIComponent(text)+ "&page=" + page;
            return $http.get(url);
        }

        function hasSearchBeenSet(){
            if(searchObject
                && searchObject.searchString == ""
                && searchObject.year == ""
                && searchObject.language == "") {
                 return false;
            }else if(searchObject){
                return true;
            }
            return false;
        }

        function getUrlForSearch() {
            var parameters = "";


            if(hasSearchBeenSet()){
                if(searchObject.searchString != ""){

                    if(searchObject.language != ""){
                        parameters = parameters + "&language=" + searchObject.language;
                    }

                    if(searchObject.yearType == "Release Year" && searchObject.year != ""){
                        parameters = parameters + "&year=" + searchObject.year;
                    }

                    if(searchObject.ageLock){
                        parameters = parameters + "&include_adult=false";
                    }else{
                        parameters = parameters + "&include_adult=true";
                    }
                    return searchUrl.replace("API_KEY", key) + encodeURIComponent(searchObject.searchString) + parameters;
                }

                if(searchObject.year != ""){
                    if(searchObject.yearType == "Release Year"){
                        parameters = parameters + "&year=" + searchObject.year;
                    }else if(searchObject.yearType == "Before"){
                        parameters = parameters + "&release_date.lte=" + searchObject.year + "-01-01";
                    }else{
                        parameters = parameters + "&release_date.gte=" + searchObject.year + "-01-01";
                    }
                }


                if(searchObject.ageLock){
                    parameters = parameters + "&include_adult=false";
                }else{
                    parameters = parameters + "&include_adult=true";
                }

                return discoverUrl.replace("API_KEY", key) + encodeURIComponent(parameterString) + parameters;

            }else{
                return discoverUrl.replace("API_KEY", key) + encodeURIComponent(parameterString);
            }

        }

        function discoverMovies() {
            var url = getUrlForSearch();
            return $http.get(url);
        }
        
        function discoverMoviesByPage(page) {
            var url = getUrlForSearch();
            var url = url + "&page=" + page;
            return $http.get(url);
        }

        function setSearchObject(so) {
            searchObject = so;
        }
        
        function getSearchObject() {
            return searchObject;
        }

        function resetSearchObject() {
            searchObject = {
                searchString : "",
                year : "",
                yearType : "After",
                language : "",
                ageLock : true
            }
            return searchObject;
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