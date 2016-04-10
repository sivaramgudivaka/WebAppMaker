module.exports = function (app, model) {

    app.post ("/api/application/:applicationId/page/:pageId/widget/:widgetId/script", createScript);

    var applicationModel = model.applicationModel;

    function createScript(req, res) {

        // path parameters
        var applicationId = req.params.applicationId;
        var pageId        = req.params.pageId;
        var widgetId      = req.params.widgetId;

        // body data
        var script        = req.body;

        console.log([applicationId, pageId, widgetId, script]);

        res.sendStatus(200);
    }
}