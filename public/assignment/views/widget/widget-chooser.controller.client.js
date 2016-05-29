(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserViewController", WidgetChooserViewController);

    function WidgetChooserViewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.widgetClicked = widgetClicked;

        init();

        function init() {
            vm.widgetTemplates = WidgetService.getWidgetTemplates();
        }
        
        function widgetClicked(widgetType) {
            var widget = WidgetService.createWidgetOfType(vm.pid, widgetType);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
        }
    }

})();