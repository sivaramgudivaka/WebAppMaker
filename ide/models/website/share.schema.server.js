var mongoose = require("mongoose");

module.exports = function () {

    var ShareSchema = mongoose.Schema({
        applicationId: String,
        developerId: String,
        username: String
    }, {collection: "share"});

    return ShareSchema;
};
