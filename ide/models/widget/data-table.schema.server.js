var mongoose = require("mongoose");

module.exports = function () {

    var DataTableSchema = mongoose.Schema({
        collectionName :  String,
        fields         : [String],
        sortable       :  Boolean,
        filterable     :  Boolean,
        deletable      :  Boolean // added deletable 
    });

    return DataTableSchema;
};