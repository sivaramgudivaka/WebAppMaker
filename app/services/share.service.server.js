module.exports = function(app, shareModel, applicationModel) {

    app.post   ("/api/share/:applicationId/developer/:username", shareApplication)
    app.get    ("/api/share/:applicationId", findSharedApplication)
    app.delete ("/api/share/:applicationId/developer/:username", unshareApplication)

    function unshareApplication(req, res) {
        var applicationId = req.params.applicationId;
        var username = req.params.username;
        shareModel
            .unshareApplication(applicationId, username)
            .then(
                function(share) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function shareApplication(req, res) {
        var applicationId = req.params.applicationId;
        var username = req.params.username;
        shareModel
            .shareApplication(applicationId, username)
            .then(
                function(share) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findSharedApplication(req, res) {
        var applicationId = req.params.applicationId;
        shareModel
            .findSharedApplication(applicationId)
            .then(
                function(shares) {
                    var developers = [];
                    for(var s in shares) {
                        developers.push({username: shares[s].username, developerId: shares[s].developerId});
                    }
                    res.json(developers);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};