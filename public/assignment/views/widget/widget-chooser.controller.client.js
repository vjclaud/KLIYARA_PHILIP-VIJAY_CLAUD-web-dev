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
            WidgetService
                .getWidgetTemplates()
                .then(function (response) {
                    vm.widgetTemplates = response.data;
                });
        }
        
        function widgetClicked(widgetType) {
            WidgetService
                .createWidgetOfType(vm.pid, widgetType)
                .then(function (response) {
                    var widget = response.data;
                    if(widget.widgetType === "HTML"){
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id  + "/html");
                    }else{
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                    }

                });
        }
    }

})();