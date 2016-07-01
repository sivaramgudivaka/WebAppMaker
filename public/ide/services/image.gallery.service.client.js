/**
 * Created by rushi on 6/30/16.
 */
(function () {
    angular
        .module ("WebAppMakerApp")
        .factory ("ImageGalleryService", imageGalleryService);

    function imageGalleryService ($http) {
        var api = {
            addImage: addImage,
            deleteImage:deleteImage
        };
        return api;

        function addImage(image) {
            return $http.post("/api/image/", image);
        }

        function deleteImage(imageId){
            return $http.delete("/api/image/"+imageId);
        }

    }
})();