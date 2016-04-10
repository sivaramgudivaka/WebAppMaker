module.exports = function (app, model) {

    app.post ("/api/application/:applicationId/page/:pageId/widget/:widgetId/script", createScript);

    var scriptModel = model.scriptModel;

    function createScript(req, res) {

        // path parameters
        var applicationId = req.params.applicationId;
        var pageId        = req.params.pageId;
        var widgetId      = req.params.widgetId;

        // body data
        var script        = req.body;

        scriptModel
            .createScript(req.params, script)
            .then(
                function() {
                    res.sendStatus(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }
}