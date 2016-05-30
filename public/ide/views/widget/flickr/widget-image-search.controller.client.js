(function () {
    angular
        .module("WebAppMakerApp")
        .controller("FlickrSearchController", FlickrSearchController);

    var key = "8ce912aa7642ee64767e30bd13575d98";
    var secret = "957cd22dfae64bb0";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&callback=JSON_CALLBACK";
    var sampleURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=57b480dfc5cb523391b1e791f5fb48fc&text=lego&format=json&nojsoncallback=1&auth_token=72157669069115885-dc7943169635e389&api_sig=04178d47421af22c0c7b3c5fd4d9ff62";

    function FlickrSearchController($http, $location, $routeParams, WidgetService) {
        var vm = this;
        vm.search = search;
        vm.selectPhoto = selectPhoto;
        var username = $routeParams.username;
        var websiteId = $routeParams.websiteId;
        var pageId = $routeParams.pageId;
        var widgetId = $routeParams.widgetId;

        function selectPhoto(photo) {
            var url = "https://farm";
            url += photo.farm;
            url += ".staticflickr.com/";
            url += photo.server;
            url += "/";
            url += photo.id;
            url += "_";
            url += photo.secret;
            url += "_b.jpg";
            console.log(url);
            WidgetService
                .updateWidget(websiteId, pageId, widgetId, {url: url})
                .then(
                    function(response){
                        var url = "/developer/"+username+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId+"/edit"
                        console.log(response);
                        $location.url(url);
                    },
                    function(error){
                        console.log(error);
                    }
                );
        }

        function search(text) {
            var url = urlBase.replace("API_KEY", key)
                .replace("TEXT", text);
            $http.get(url)
                .success(function(response){
                    response = response.replace("jsonFlickrApi(","");
                    response = response.substring(0,response.length - 1);
                    response = JSON.parse(response);
                    vm.results = response;
                })
                .error(function(error) {
                    console.log(error);
                });
        }
    }
})();