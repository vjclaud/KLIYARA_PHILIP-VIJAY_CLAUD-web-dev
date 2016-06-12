(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetHtmlViewController", WidgetHtmlViewController);

    function WidgetHtmlViewController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.wgid = $routeParams['wgid'];
        vm.updateWidget = updateWidget;

        init();

        function init() {
            WidgetService.findWidgetById(vm.wgid)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.wgid, widget)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function () {
                        vm.error = "widget couldn't be updated";
                    });
        }
    }

})();