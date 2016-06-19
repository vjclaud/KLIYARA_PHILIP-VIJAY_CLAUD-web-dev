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
            PageService
                .findPageById(vm.pid)
                .then(function (response) {
                    vm.page = response.data;
                });
        }

        function updatePage(page) {
            vm.form.$setSubmitted();
            if(vm.form.$invalid){
                vm.error = "Name is required";
                return;
            }
            PageService
                .updatePage(vm.pid, page)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function () {
                        vm.error = "couldn't update page";
                    });
        }

        function deletePage() {
            PageService
                .deletePage(vm.pid)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    },
                    function () {
                        vm.error = "couldn't delete page";
                    });
        }
    }

})();