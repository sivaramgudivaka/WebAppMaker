module.exports = function (app, applicationModel) {

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/application/:applicationId/page/:pageId/widget", createWidget);
    app.get  ("/api/application/:applicationId/page/:pageId/widget", getWidgets);
    app.get  ("/api/application/:applicationId/page/:pageId/widget/:widgetId", findWidgetById);
    app.put  ("/api/application/:applicationId/page/:pageId/widget/:widgetId", updateWidget);
    app.delete("/api/application/:applicationId/page/:pageId/widget/:widgetId", removeWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put    ("/api/application/:applicationId/page/:pageId/widget", updateWidgets);

    var widgetModel = require("../models/widget/widget.model.server.js")(applicationModel);

    function updateWidgets(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if (startIndex && endIndex) {
            widgetModel
                .sortWidget(applicationId, pageId, startIndex, endIndex)
                .then(
                    function (stat) {
                        return res.json(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function uploadImage(req, res) {

        var username      = req.user.username;
        var applicationId = req.body.applicationId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var destination   = myFile.destination;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;

        applicationModel.getMongooseModel()
            .findById(applicationId)
            .then(
                function(application) {
                    var widget = application.pages.id(pageId).widgets.id(widgetId);
                    widget.image.url = "/uploads/"+filename;//originalname;
                    widget.image.width = width;
                    return application.save();
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(){
                    res.redirect("/#/developer/"+username+"/application/"+applicationId+"/page/"+pageId+"/widget");
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeWidget(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        widgetModel
            .removeWidget(applicationId, pageId, widgetId)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(applicationId, pageId, widgetId, widget)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );


    }

    function findWidgetById(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        var widgetId = req.params.widgetId;
        applicationModel
            .findApplicationById(applicationId)
            .then(
                function(application) {
                    res.json(application.pages.id(pageId).widgets.id(widgetId));
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getWidgets(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        applicationModel
            .findApplicationById(applicationId)
            .then(
                function(application) {
                    res.json(application.pages.id(pageId).widgets);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createWidget(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        var widgetType = req.query.widgetType;
        widgetModel
            .createWidget(applicationId, pageId, widgetType)
            .then(
                function(application) {
                    var widgets = application.pages.id(pageId).widgets;
                    res.send(widgets[widgets.length - 1]);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
}