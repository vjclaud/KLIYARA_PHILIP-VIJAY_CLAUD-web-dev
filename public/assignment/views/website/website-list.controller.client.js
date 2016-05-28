(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListViewController", WebsiteListViewController);

    function WebsiteListViewController($routeParams, WebsiteService) {
        var vm = this;
        init();


        function init() {
            vm.uid = $routeParams['uid'];
            vm.websites = WebsiteService.findWebsitesByUser($routeParams['uid']);
        }
    }

})();