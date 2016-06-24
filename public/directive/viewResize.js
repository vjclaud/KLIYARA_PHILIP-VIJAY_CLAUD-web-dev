var overviewHeight = null;
(function () {
    angular
        .module("viewResize", [])
        .directive('viewResize', function ($window) {
        return {
            link: function postLink(scope, element, attrs) {

                scope.onResizeFunction = function() {
                    var windowWidth = $window.innerWidth;
                    var textSection = element.find("#overview");
                    var imgSection = element.find("#poster");

                    if(overviewHeight == null){
                        $("body").append("<table><tbody><tr><td><div id='textSizeReference' class='limit-text'>T</div></td></tr></tbody></table>");
                        overviewHeight = $("#textSizeReference").height();
                        $("#textSizeReference").remove();

                    }

                    
                    
                    textSection.css('max-height', imgSection.height() - 20 + 'px' );

                    textSection.css('line-height', overviewHeight + 'px' );
                    textSection.css('-webkit-line-clamp', parseInt((imgSection.height() - 20)/overviewHeight) + ''  );
                };

                // Call to the function when the page is first loaded
                scope.onResizeFunction();

                angular.element($window).bind('resize', function() {
                    scope.onResizeFunction();
                    scope.$apply();
                });
            }
        };
    })
    .directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    scope.onResizeFunction();
                });
                element.bind('error', function(){
                });
            }
        };
    });;
})();