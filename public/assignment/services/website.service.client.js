(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",  "developerId": "456" },
        { "_id": "234", "name": "Tweeter",   "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",  "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",   "developerId": "123" },
        { "_id": "789", "name": "Chess",  "developerId": "234" }
    ]

    function WebsiteService() {
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
            websites.push(website);
            return website;
        }

        function createWebsiteWithDetails(name, description, userId) {
            var website = {
                "_id": (new Date()).getTime() + "",
                "name": name ? name + "" : "",
                "description": description ? description + "" : "",
                "developerId": userId + ""
            }
            return createWebsite(userId, website);
        }

        function findWebsitesByUser(userId){
            var userWebsites = [];

            for(var i in websites){
                if(websites[i].developerId === userId +""){
                    userWebsites.push(websites[i]);
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId){
            for(var i in websites){
                if(websites[i]._id === websiteId +""){
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {

            var userWebsite = findWebsiteById(websiteId);
            if(userWebsite){
                userWebsite.name = website.name;
                userWebsite.description = website.description;
                return true;
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for(var i in websites){
                if(websites[i]._id === websiteId+""){
                    websites.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();