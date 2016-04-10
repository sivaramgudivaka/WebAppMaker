module.exports = function (app, model) {

    app.post ("/api/application/:applicationId/page/:pageId/widget/:widgetId/script", saveScript);

    var scriptModel = model.scriptModel;

    function saveScript(req, res) {

        // path parameters
        var applicationId = req.params.applicationId;
        var pageId        = req.params.pageId;
        var widgetId      = req.params.widgetId;

        // body data
        var script        = req.body;

        scriptModel
            .saveScript(req.params, script)
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