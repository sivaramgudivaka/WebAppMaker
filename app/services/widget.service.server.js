module.exports = function (app, applicationModel) {

    app.post ("/api/application/:applicationId/page/:pageId/widget", createWidget);
    app.get  ("/api/application/:applicationId/page/:pageId/widget", getWidgets);
    app.get  ("/api/application/:applicationId/page/:pageId/widget/:widgetId", findWidgetById);
    app.put  ("/api/application/:applicationId/page/:pageId/widget/:widgetId", updateWidget);

    var widgetModel = require("../models/widget/widget.model.server.js")(applicationModel);

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
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
}