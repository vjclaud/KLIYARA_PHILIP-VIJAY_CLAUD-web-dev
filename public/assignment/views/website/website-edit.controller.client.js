(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditViewController", WebsiteEditViewController);

    function WebsiteEditViewController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        init();



        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }

        function updateWebsite(website) {
            WebsiteService.updateWebsite(vm.wid, website);
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.wid);
        }
    }

})();