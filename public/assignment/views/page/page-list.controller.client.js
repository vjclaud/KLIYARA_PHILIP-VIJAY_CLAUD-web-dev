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
            PageService
                .findPageByWebsiteId(vm.wid)
                .then(function (response) {
                    vm.pages = response.data;
                });
        }
    }

})();