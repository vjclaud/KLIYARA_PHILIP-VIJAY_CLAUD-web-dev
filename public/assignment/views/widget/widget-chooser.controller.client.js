(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserViewController", WidgetChooserViewController);

    function WidgetChooserViewController($routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.widgetClicked = widgetClicked;

        init();

        function init() {
            vm.widgetTemplates = WidgetService.getWidgetTemplates();
        }
        
        function widgetClicked() {
            //#/user/{{uid}}/website/{{model.website._id}}/page/{{model.page._id}}/widget/{{model.widget._id}}
        }
    }

})();