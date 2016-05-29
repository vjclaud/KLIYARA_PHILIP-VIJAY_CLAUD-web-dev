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
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.wid));
        }

        function updateWebsite(website) {
            var updated = WebsiteService.updateWebsite(vm.wid, website);
            if(updated){
                $location.url("/user/" + vm.uid + "/website");
            }else{
                vm.error = "couldn't update website";
            }
        }

        function deleteWebsite() {

            var deleted = WebsiteService.deleteWebsite(vm.wid);
            if(deleted){
                $location.url("/user/" + vm.uid + "/website");
            }else{
                vm.error = "couldn't delete website";
            }
        }
    }

})();