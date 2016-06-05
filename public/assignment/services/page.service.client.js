(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    function PageService($http) {
        var api = {
            createPage : createPage,
            createPageWithDetails : createPageWithDetails,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        }

        return api;

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url,page);
        }

        function createPageWithDetails(name, title, websiteId) {
            var page = {
                "name": name ? name + "" : "",
                "title": title ? title + "" : "",
                "websiteId": websiteId + ""
            }
            return createPage(websiteId, page);
        }

        function findPageByWebsiteId(websiteId){
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function findPageById(pageId){
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();