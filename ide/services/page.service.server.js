module.exports = function (app, model) {

    var applicationModel = model.applicationModel;

    app.post   ("/api/website/:applicationId/page", createPage);
    app.get    ("/api/website/:applicationId/page", findPagesForApplication);
    app.get    ("/api/website/:applicationId/page/:pageId", findPage);
    app.delete ("/api/website/:applicationId/page/:pageId", removePage);
    app.put    ("/api/website/:applicationId/page/:pageId", updatePage);
    app.put    ("/api/website/:applicationId/page", updatePages);

    var pageModel   = require("../models/page/page.model.server.js")(applicationModel);

    function updatePages (req, res) {
        var applicationId = req.params.applicationId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {
            pageModel
                .sortPage(applicationId, startIndex, endIndex)
                .then(
                    function(stat) {
                        return res.json(200);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
    }

    function updatePage (req, res) {
        var applicationId = req.params.applicationId;
        var page = req.body;
        pageModel
            .updatePage(applicationId, page)
            .then(
                function(stat) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function removePage (req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        pageModel
            .removePage(applicationId, pageId)
            .then(
                function(stat) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function findPage(req, res) {
        var applicationId = req.params.applicationId;
        var pageId = req.params.pageId;
        pageModel
            .findPage(applicationId, pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findPagesForApplication(req, res) {
        var applicationId = req.params.applicationId;
        pageModel
            .findPagesForApplication(applicationId)
            .then(
                function(application) {
                    res.json(application.pages);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createPage(req, res) {
        var applicationId = req.params.applicationId;
        var page = req.body;
        pageModel
            .createPage(applicationId, page)
            .then(
                function(application) {
                    res.json(application);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
}