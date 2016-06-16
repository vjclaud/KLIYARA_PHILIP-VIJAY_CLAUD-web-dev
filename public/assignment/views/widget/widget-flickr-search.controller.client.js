(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetFlickrViewController", WidgetFlickrViewController);

    function WidgetFlickrViewController($location, $sce, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.pid = $routeParams['pid'];
        vm.wid = $routeParams['wid'];
        vm.wgid = $routeParams['wgid'];
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        init();

        function init() {
            WidgetService.findWidgetById(vm.wgid)
                .then(function (response) {
                    vm.widget = response.data;
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

        function searchPhotos(searchTerm) {
            WidgetService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
            WidgetService
                .updateWidget(vm.wgid, vm.widget)
                .then(
                    function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    },
                    function () {
                        vm.error = "photo couldn't be added";
                    });
        }
    }

})();