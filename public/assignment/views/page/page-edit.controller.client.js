(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditViewController", PageEditViewController);

    function PageEditViewController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        init();



        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pid));
        }

        function updatePage(page) {
            var updated = PageService.updatePage(vm.pid, page);
            if(updated){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }else{
                vm.error = "couldn't update page";
            }
        }

        function deletePage() {
            var deleted = PageService.deletePage(vm.pid);
            if(deleted){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            }else{
                vm.error = "couldn't delete page";
            }
        }
    }

})();