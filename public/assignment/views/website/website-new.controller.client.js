(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewViewController", WebsiteNewViewController);

    function WebsiteNewViewController($location, $routeParams, WebsiteService) {
        var vm = this;
        init();
        vm.uid = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {

        }

        function createWebsite(name, description) {
            var website = WebsiteService.createWebsiteWithDetails(name, description, vm.uid);
            if(website){
                $location.url("/user/" + vm.uid + "/website");
            }else{
                vm.error = "couldn't create website";
            }
        }
    }

})();