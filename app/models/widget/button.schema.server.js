var mongoose = require("mongoose");

module.exports = function () {

    var ButtonSchema = mongoose.Schema({
        url       : String,
        pageId    : String,
        icon      : String,
        style     : String,
        dbCommand : String,
        navigate  : String
    });

    return ButtonSchema;
};