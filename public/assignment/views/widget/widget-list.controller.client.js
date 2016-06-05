(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListViewController", WidgetListViewController);

    function WidgetListViewController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.editWidget = editWidget;

        init();

        function init() {
             WidgetService
                 .findWidgetsByPageId(vm.pid)
                 .then(function (response) {
                     vm.widgets = response.data;
                 });
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var lastParts = urlParts[urlParts.length -1].split("=");
            var id = lastParts[lastParts.length -1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(widget) {
            $location.url("/user/" + vm.uid +"/website/" + vm.wid +"/page/" + vm.pid +"/widget/" + widget._id);
        }
    }

})();