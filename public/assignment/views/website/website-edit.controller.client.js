(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditViewController", WebsiteEditViewController);

    function WebsiteEditViewController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        init();



        function init() {
            WebsiteService
                .findWebsiteById(vm.wid)
                .then(function (response) {
                    vm.website = response.data;
                });
        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.wid, website)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website");
                    },
                    function () {
                        vm.error = "couldn't update website";
                    });
        }

        function deleteWebsite() {

            WebsiteService
                .deleteWebsite(vm.wid)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website");
                    },
                    function () {
                        vm.error = "couldn't delete website";
                    });
        }
    }

})();