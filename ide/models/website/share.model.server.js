var mongoose = require("mongoose");

module.exports = function (applicationModel) {

    var ShareSchema = require("./share.schema.server.js")();
    var ShareModel = mongoose.model("ShareModel", ShareSchema);

    var api = {
        shareApplication: shareApplication,
        unshareApplication: unshareApplication,
        findSharedApplication: findSharedApplication
    };
    return api;

    function unshareApplication(applicationId, username) {
        return ShareModel.remove({applicationId: applicationId, username: username});
    }

    function shareApplication(applicationId, username) {
        var share = new ShareModel();
        share.applicationId = applicationId;
        share.username      = username;
        return share.save();
    }

    function findSharedApplication(applicationId) {
        return ShareModel.find({applicationId: applicationId});
    }
};