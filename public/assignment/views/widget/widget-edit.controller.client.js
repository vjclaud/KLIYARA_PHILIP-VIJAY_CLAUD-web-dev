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
             WidgetService.findWidgetById(vm.wgid)
                 .then(function (response) {
                     vm.widget = response.data;
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
                         case "FLICKR" :
                             vm.showUrl = true;
                             vm.showWidth = true;
                             vm.showFlickr = true;
                             break;
                     }
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

        function deleteWidget(widget) {
            WidgetService
                .deleteWidget(widget._id)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function () {
                        vm.error = "widget couldn't be deleted";
                    });
        }
    }

})();