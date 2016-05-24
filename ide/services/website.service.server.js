var mongoose = require("mongoose");

module.exports = function (app, model) {

    var websiteModel = model.websiteModel;

    app.post   ("/api/developer/:username/website", createApplication);
    app.get    ("/api/developer/:username/website", findApplicationsForUsername);
    app.get    ("/api/website/:websiteId", findApplicationById);
    app.delete ("/api/website/:websiteId", removeApplication);
    app.put    ("/api/website/:websiteId", updateApplication);

    function updateApplication (req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        websiteModel
            .updateApplication(websiteId, website)
            .then(
                function(response) {
                    res.json(response.result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function removeApplication (req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .removeApplication(websiteId)
            .then(
                function(response) {
                    res.json(response.result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findApplicationById (req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findApplicationById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findApplicationsForUsername (req, res) {
        var username = req.params.username;
        websiteModel
            .findApplicationsForUsername (username)
            .then (
                function (websites) {
                    res.json (websites);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createApplication (req, res) {
        var username = req.params.username;
        var website = req.body;
        websiteModel
            .createApplication (website)
            .then (
                function (website) {
                    res.json (website);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}