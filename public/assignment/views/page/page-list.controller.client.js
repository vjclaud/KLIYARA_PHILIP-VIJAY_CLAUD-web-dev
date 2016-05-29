(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListViewController", PageListViewController);

    function PageListViewController($routeParams, PageService) {
        var vm = this;
        init();



        function init() {
            vm.uid = $routeParams['uid'];
            vm.wid = $routeParams['wid'];
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
    }

})();