module.exports = function (app, model) {

    app.post ("/api/application/:applicationId/page/:pageId/widget/:widgetId/script", saveScript);
    app.get  ("/api/application/:applicationId/page/:pageId/widget/:widgetId/script", findScript);

    var scriptModel = model.scriptModel;

    function findScript(req, res) {

        model.applicationModel
            .findApplicationById(req.params.applicationId)
            .then(
                function(application) {
                    var widget = application
                        .pages.id(req.params.pageId)
                        .widgets.id(req.params.widgetId);

                    if (widget.button && widget.button.script) {
                        res.json(widget.button.script);
                    } else {
                        res.json({});
                    }
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

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