/**
 * Created by rushi on 6/30/16.
 */
var mongoose = require("mongoose");

module.exports = function (app, model) {

    var imageGalleryModel = model.imageGalleryModel;

    function findUserImages(req,res)
    {
        var developerId=req.params.userId;
        imageGalleryModel
            .findUserImages(developerId)
            .then(function(images)
                {
                    res.json(images);
                },  function(error){
                    res.status(404).send(error);
                }
            )
    }
    function uploadImage(req, res) {
        console.log("In Api Upload")
        //    var username      = req.user.username;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var developerId   = req.body.developerId;
        var destination   = myFile.destination;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;

        var imageGallery = {
                _developer:developerId,
                url: "/uploads/" + filename,
                source: upload,
            
        };
        imageGalleryModel
            .addImage(imageGallery)
            .then(function(response) {
                    console.log("In ImageGallery");

                },
                function(err) {
                    res.status(404).send(err);
                });
        res.redirect("/ide/index.html#/developer/"+developerId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

};
