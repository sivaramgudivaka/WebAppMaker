var mongoose = require("mongoose");

module.exports = function() {

    var DatabaseStatementSchema = mongoose.Schema({
        operationType : {type : String, enum : ["Select", "Insert", "Update", "Delete"]},
        collectionName    : String
    });

    return DatabaseStatementSchema;
};