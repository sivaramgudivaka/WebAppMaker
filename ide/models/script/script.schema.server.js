var mongoose = require("mongoose");

module.exports = function() {

    var StatementSchema = require("../statement/statement.schema.server.js")();

    var ScriptSchema = mongoose.Schema({
        _widget    : {type: mongoose.Schema.ObjectId, ref: 'Script'},
        name       :  String,
        scope      :  Object,
        statements : [StatementSchema]
    }, {collection: 'script'});

    return ScriptSchema;
};