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
            deleteImage:deleteImage,
            findUserImages:findUserImages
        };
        return api;

        function addImage(developerId,image) {
            return $http.post("/api/image/"+developerId, image);
        }

        function deleteImage(imageId){
            return $http.delete("/api/image/"+imageId);
        }
        function findUserImages(developerId)
        {
            return $http.get("/api/image/"+developerId);
        }
    }
})();