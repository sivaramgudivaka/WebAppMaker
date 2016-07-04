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
            console.log(image);
            ImageGalleryService
                .addImage(vm.developerId,image)
                .then(function (response) {
                    console.log(response);
                    $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId+"/image");
                },
                function(error){
                    vm.error="Unable to add Image to database";
                })
        }



    }
    
    function ImageGalleryController($http, $location, $routeParams,WidgetService,ImageGalleryService) {
        var vm = this;

        vm.developerId = $routeParams.developerId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;
        vm.selectImage = selectImage;
        vm.deleteImage=deleteImage;
        //    console.log("DeveloperID")
        console.log(vm.developerId);
        function init() {
            ImageGalleryService
                .findUserImages(vm.developerId)
                .then(
                    function (response) {
                        vm.images = response.data;
                        console.log(vm.images);
                    },
                    function (error) {
                        vm.error = "Cannot find Images";
                    }
                )
        }

        init();
        function selectImage(image) {
            var newWidget={
                image:{
                    image_Id:image._id,
                    url:image.url,
                    size:""
                }
            }
            WidgetService
                .updateWidget(vm.websiteId, vm.pageId, vm.widgetId, newWidget)
                .then(function (response) {
                        var result = response.data;
                        //console.log(response);
                        console.log("Result")
                        console.log(result);
                        if (result) {
                            $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        }
                    },
                    function (error) {
                        vm.error = error;
                    });
        }
        function deleteImage(imageId)
        {
            console.log(imageId);
            ImageGalleryService
                .deleteImage(imageId)
                .then(function(response){
                    WidgetService
                        .deleteUserImages(imageId)
                        .then(function (response) {
                            init();
                            },function (error) {
                        vm.error="Something Went Wrong";
                    });

                },function(error)
                {
                    vm.error="Unable to remove Image";
                })
            
        }
    }

        function GoogleSearchController($http, $location, $routeParams, WidgetService,ImageGalleryService)
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
            vm.addImage=addImage;
            console.log(vm.widgetId);
            console.log(vm.pageId);

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
                var image={

                    url:photo.link,
                    name:"Google-Image",
                    source:"Google Search"
                }
                ImageGalleryService
                    .addImage(vm.developerId,image)
                    .then(function (response) {
                        var image=response.data;
                        console.log("The image _id");
                        console.log(image._id)
                        var newWidget={
                            image:{
                                image_Id:image._id,
                                url:photo.link,
                                size:""
                            }
                        };

                WidgetService
                    .updateWidget(vm.websiteId, vm.pageId, vm.widgetId,newWidget)
                    .then(function (response) {
                            var result = response.data;
                            if (result) {
                                $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                            }
                        },
                        function (error) {
                            vm.error = error;
                        });
                    })
            }

            function moreImage()
            {
                var url = urlBase.replace("flower", vm.text)
                vm.index=vm.index+10;
                url=url+"&start="+vm.index;
                $http.get(url)
                    .success(function(response){
                        temp=response;
                        temp=temp.items;
                        vm.results=vm.results.concat(temp);

                    })
                    .error(function(error) {
                        console.log(error);
                    });
            }
            function addImage(photo)
            {
                var image={
                    url:photo.link,
                    name:"Google-Image",
                    source:"Google Search"
                }
                ImageGalleryService
                    .addImage(vm.developerId,image)
                    .then(function (response) {
                            $location.url("/developer/" + vm.developerId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+vm.widgetId+"/image");
                        },
                        function(error){
                            vm.error="Unable to add Image to database";
                        })
            }

            
        }
        

})();
