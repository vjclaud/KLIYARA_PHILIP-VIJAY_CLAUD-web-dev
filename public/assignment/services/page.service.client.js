(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ]

    function PageService() {
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
            pages.push(page);
            return page;
        }

        function createPageWithDetails(name, title, websiteId) {
            var page = {
                "_id": (new Date()).getTime() + "",
                "name": name ? name + "" : "",
                "title": title ? title + "" : "",
                "websiteId": websiteId + ""
            }
            return createPage(websiteId, page);
        }

        function findPageByWebsiteId(websiteId){
            var userPages = [];

            for(var i in pages){
                if(pages[i].websiteId === websiteId +""){
                    userPages.push(pages[i]);
                }
            }
            return userPages;
        }

        function findPageById(pageId){
            for(var i in pages){
                if(pages[i]._id === pageId+""){
                    return pages[i];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            var userPage = findPageById(pageId);

            if(userPage){
                userPage.name = page.name;
                userPage.title = page.title;
                return true;
            }

            return false;
        }

        function deletePage(pageId) {
            for(var i in pages){
                if(pages[i]._id === pageId+""){
                    pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();