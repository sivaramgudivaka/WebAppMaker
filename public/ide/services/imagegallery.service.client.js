
(function () {
    angular
        .module ("WebAppMakerApp")
        .factory ("ImageGalleryService", ImageGalleryService);

    function ImageGalleryService($http)
    {
        var api={
            findUserImages:findUserImages
        };
        return api;

        function findUserImages(user_Id)
        {
            return $http.get("/api/images/"+user_Id);
        }
    }
})();