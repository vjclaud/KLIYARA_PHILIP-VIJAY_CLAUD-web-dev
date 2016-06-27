(function () {
    angular
        .module("MovieSuggester")
        .factory("MovieService", MovieService);


    function MovieService($http) {
        var api = {
            createWebsite : createWebsite,
            createWebsiteWithDetails : createWebsiteWithDetails,
            findWebsitesByUser : findWebsitesByUser,
            findWebsiteById : findWebsiteById,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite
        }

        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/" + userId + "/website";
            return $http.post(url,website);
        }

        function createWebsiteWithDetails(name, description, userId) {
            var website = {
                "name": name ? name + "" : "",
                "description": description ? description + "" : ""
            }
            return createWebsite(userId, website);
        }

        function findWebsitesByUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }
    }
})();