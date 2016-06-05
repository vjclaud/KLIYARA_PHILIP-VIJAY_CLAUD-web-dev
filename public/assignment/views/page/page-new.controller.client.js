(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewViewController", PageNewViewController);

    function PageNewViewController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.createPage = createPage;


        function createPage(name, title) {
            if(!name || name.length < 3){
                vm.error = "page name should be at least 3 charaters long";
            }else{
                PageService
                    .createPageWithDetails(name, title, vm.wid)
                    .then(function (response) {
                        var page = response.data;
                        if(page){
                            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                        }else{
                            vm.error = "couldn't create website";
                        }
                    });

            }
        }
    }

})();