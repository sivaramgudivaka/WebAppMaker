var mongoose = require("mongoose");

module.exports = function (app, model) {

    var applicationModel = model.applicationModel;

    app.post   ("/api/developer/:username/application", createApplication);
    app.get    ("/api/developer/:username/application", findApplicationsForUsername);
    app.get    ("/api/application/:applicationId", findApplicationById);
    app.delete ("/api/application/:applicationId", removeApplication);
    app.put    ("/api/application/:applicationId", updateApplication);

    function updateApplication (req, res) {
        var application = req.body;
        var applicationId = req.params.applicationId;
        applicationModel
            .updateApplication(applicationId, application)
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
        var applicationId = req.params.applicationId;
        applicationModel
            .removeApplication(applicationId)
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
        var applicationId = req.params.applicationId;
        applicationModel
            .findApplicationById(applicationId)
            .then(
                function(application) {
                    res.json(application);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findApplicationsForUsername (req, res) {
        var username = req.params.username;
        applicationModel
            .findApplicationsForUsername (username)
            .then (
                function (applications) {
                    res.json (applications);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createApplication (req, res) {
        var username = req.params.username;
        var application = req.body;
        applicationModel
            .createApplication (application)
            .then (
                function (application) {
                    res.json (application);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}