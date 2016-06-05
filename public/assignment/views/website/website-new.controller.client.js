(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewViewController", WebsiteNewViewController);

    function WebsiteNewViewController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.createWebsite = createWebsite;


        function createWebsite(name, description) {

            if(!name || name.length < 3){
                vm.error = "website name should be at least 3 charaters long";
            }else{
                WebsiteService.createWebsiteWithDetails(name, description, vm.uid)
                    .then(function (response) {
                        var website = response.data;
                        if(website){
                            $location.url("/user/" + vm.uid + "/website");
                        }else{
                            vm.error = "couldn't create website";
                        }
                    });
            }
        }
    }

})();