(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditViewController", WidgetEditViewController);

    function WidgetEditViewController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.wgid = $routeParams['wgid'];

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();



        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.wgid));

            switch (vm.widget.widgetType + ""){
                case "HEADER" :
                    vm.showSize = true;
                    break;
                case "IMAGE" :
                    vm.showUrl = true;
                    vm.showWidth = true;
                    vm.showUpload = true;
                    break;
                case "YOUTUBE" :
                    vm.showUrl = true;
                    vm.showWidth = true;
                    break;
            }
        }

        function updateWidget(widget) {
            var updated = WidgetService.updateWidget(vm.wgid, widget);
            if(updated){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }else{
                vm.error = "widget couldn't be updated";
            }
        }

        function deleteWidget(widget) {
            var deleted = WidgetService.deleteWidget(widget._id);
            if(deleted){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }else{
                vm.error = "widget couldn't be deleted";
            }
        }
    }

})();