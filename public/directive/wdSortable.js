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
                    var localCodyWidgets = angular.copy(scope.model.widgets);
                    localCodyWidgets.sort(function(a, b) {
                        return a.order > b.order;
                    });
                    end = ui.item.index();


                    if(start < end){
                        var endOrder = localCodyWidgets[end].order;
                        for(var i = start + 1; i <=end; i++){
                            localCodyWidgets[i].order = localCodyWidgets[i].order -1;
                        }
                        localCodyWidgets[start].order = endOrder;
                    }else if(end < start){
                        var endOrder = localCodyWidgets[end].order;
                        for(var i = start - 1; i >=end; i--){
                            localCodyWidgets[i].order = localCodyWidgets[i].order +1;
                        }
                        localCodyWidgets[start].order = endOrder;
                    }

                    scope.model.widgets = localCodyWidgets;

                    if(start < end){
                        for(var i = start; i <=end; i++){
                            scope.model.updateWidget(localCodyWidgets[i]._id, localCodyWidgets[i]);
                        }
                    }else if(end < start){
                        for(var i = start; i >=end; i--){
                            scope.model.updateWidget(localCodyWidgets[i]._id, localCodyWidgets[i]);
                        }
                    }
                    scope.$apply();
                }
            });
        }
        return{
            link : link
        }
    }
})();