(function () {
    angular
        .module("wdSortable", [])
        .directive("wdSortable", WdSortable);
    
    function WdSortable() {
        var start = null;
        var end = null;
        
        function link(scope, element, attributes) {
            var wdAxis = attributes.wdaxis;
            $(element).sortable({
                axis : wdAxis,
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop : function (event, ui) {
                    end = ui.item.index();
                    var temp = scope.model.widgets[start];
                    scope.model.widgets[start] = scope.model.widgets[end];
                    scope.model.widgets[end] = temp;
                    scope.$apply();
                    scope.model.updateWidgetOrder();
                }
            });
        }
        return{
            link : link
        }
    }
})();