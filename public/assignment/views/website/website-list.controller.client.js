(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListViewController", WebsiteListViewController);

    function WebsiteListViewController($routeParams, WebsiteService) {
        var vm = this;
        init();


        function init() {
            vm.uid = $routeParams['uid'];
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
    }

})();