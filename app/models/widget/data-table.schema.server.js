var mongoose = require("mongoose");

module.exports = function () {

    var DataTableSchema = mongoose.Schema({
        collectionName: String,
        fields:        [String]
    });

    return DataTableSchema;
};