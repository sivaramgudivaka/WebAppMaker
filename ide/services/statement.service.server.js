module.exports = function (app, model) {

    app.post   ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementType", addStatement);
    app.get    ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", findStatement);
    app.put    ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", saveStatement);
    app.delete ("/api/developer/:developerId/website/:websiteId/page/:pageId/widget/:widgetId/script/:scriptId/statement/:statementId", deleteStatement);

    var statementModel = model.statementModel;

    function deleteStatement(req, res) {
        scriptModel
            .deleteStatement(req.params)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    function saveStatement(req, res) {
        statementModel
            .saveStatement(req.params, req.body)
            .then(
                function(statement) {
                    res.sendStatus(200);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    // handle http request for statement
    function findStatement(req, res) {
        scriptModel
            .findStatement(req.params)
            .then(
                function(statement) {
                    res.json(statement);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }

    // handle http request to add a new statement
    function addStatement(req, res) {
        scriptModel
            .addStatement(req.params)
            .then(
                function(script) {
                    res.json(script);
                },
                function(err) {
                    res.statusCode(400).send(err);
                }
            );
    }
}