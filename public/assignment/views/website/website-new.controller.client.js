(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewViewController", WebsiteNewViewController);

    function WebsiteNewViewController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.createWebsite = createWebsite;


        function createWebsite(name, description) {

            vm.form.$setSubmitted();
            if(vm.form.$invalid){
                vm.error = "Name is required";
                return;
            }

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

})();