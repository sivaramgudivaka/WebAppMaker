(function () {
    angular
        .module("WebAppMakerApp")
        .controller("ImageGalleryController", ImageGalleryController)
        .controller("GoogleSearchController",GoogleSearchController)
        .controller("AddNewImageController",AddNewImageController);

    var urlBase = "https://www.googleapis.com/customsearch/v1?key=AIzaSyAiyY6nBD2tQB-BbvzzpkIwhoNQ_ulTCIw&cx=008380424979074753132:2odwekrize8&q=flower&searchType=image&fileType=jpg&imgSize=small&alt=json";

    function AddNewImageController($http,$location,$routeParams,ImageGalleryService)
    {
        var vm=this;
        vm.developerId = $routeParams.developerId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.addImage=addImage;

        function addImage(image)
        {
            ImageGalleryService
                .addImage(image)
                .then(function (response) {
                    $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget"+vm.widgetId+"/image");
                },
                function(error){
                    vm.error="Unable to add Image to database";
                })
        }



    }
    
    function ImageGalleryController($http, $location, $routeParams,WidgetService) {
        var vm = this;

        vm.developerId = $routeParams.developerId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.selectImage = selectImage;

        //    console.log("DeveloperID")
        //  console.log(developerId);
        function init() {
            WidgetService
                .findUserImages(vm.developerId)
                .then(
                    function (response) {
                        vm.widgets = response.data;

                    },
                    function (error) {
                        vm.error = "Cannot find Images";
                    }
                )
        }

        init();
        function selectImage(widget) {
            WidgetService
                .updateWidget(vm.websiteId, vm.pageId, vm.widgetId, widget)
                .then(function (response) {
                        var result = response.data;
                        //console.log(response);
                        console.log("Result")
                        console.log(result);
                        if (result) {
                            $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + widget._page + "/widget");
                        }
                    },
                    function (error) {
                        vm.error = error;
                    });
        }
    }

        function GoogleSearchController($http, $location, $routeParams, WidgetService)
        {
            var vm=this;

            vm.developerId=$routeParams.developerId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pageId;
            vm.widgetId = $routeParams.widgetId;
            vm.moreImage=moreImage;
            vm.index=1;
            vm.text="";
            vm.search=search;
            vm.selectImage=selectImage;
            console.log(vm.widgetId);
            console.log(vm.pageId);
            function init() {
                WidgetService
                    .findWidgetById(vm.websiteId,vm.pageId,vm.widgetId)
                    .then(
                        function (response) {
                            vm.widget = response.data;
                          //  console.log(vm.widget);
                        },
                        function (error) {
                            vm.error = "Cannot find Images";
                        }
                    )
            }

            init();
            function search(text) {
                var url = urlBase.replace("flower", text)
                url=url+"&start="+vm.index;
               // console.log(url);
              //  console.log()
                vm.text=text;

                $http.get(url)
                    .success(function(response){
                        vm.results = response;
                        vm.results=vm.results.items;
                        //console.log(vm.results.items);
                    })
                    .error(function(error) {
                        console.log(error);
                    });
            }
            function selectImage(photo,widget) {
                console.log(photo.link);
                var newWidget={
                    image:{
                        url:photo.link,
                        size:"100%"
                    }
                }
                console.log(newWidget)
                WidgetService
                    .updateWidget(vm.websiteId, vm.pageId, vm.widgetId,newWidget)
                    .then(function (response) {
                            var result = response.data;
                            //console.log(response);
                            console.log("Result")
                            console.log(result);
                            if (result) {
                                $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + widget._page + "/widget");
                            }
                        },
                        function (error) {
                            vm.error = error;
                        });
            }
            function moreImage()
            {
                var url = urlBase.replace("flower", vm.text)
                vm.index=vm.index+10;
                url=url+"&start="+vm.index;
                // console.log(url);
                //  console.log()
                $http.get(url)
                    .success(function(response){
                        temp=response;
                        console.log()
                        temp=temp.items;
                        vm.results=vm.results.concat(temp);
                       // vm.results.push(temp[1]);
                        //console.log(temp.items);
                        console.log(vm.results);
                        console.log(vm.index);
                        console.log(vm.text);
                        //console.log(vm.results.items);
                    })
                    .error(function(error) {
                        console.log(error);
                    });
            }

            
        }
        

})();
