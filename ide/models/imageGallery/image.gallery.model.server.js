/**
 * Created by rushi on 6/30/16.
 */
var mongoose = require("mongoose");
var q = require("q");

module.exports = function (model) {
    var ImageGallerySchema = require("./imagegallery.schema.server")();
    var ImageGallery = mongoose.model("ImageGallery", ImageGallerySchema);
    var api={
        findUserImages:findUserImages,
        addImage:addImage,


    };
    return api;

    function findUserImages(devloper_Id)
    {
        return ImageGallery
            .find({_developer:_developer_Id});
    }
     function addImage(imagegallery)
     {
         return ImageGallery.create(imagegallery);
     }
    function deleteImage(imageId) {
        return  Website.remove({_id: imageId});
    }

};